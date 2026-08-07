import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";

import {
  HOWTO_SOURCES,
  POSTS,
  type Cluster,
  type PostMeta,
} from "./blog-registry";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export type Post = PostMeta & {
  content: string; // raw markdown body, frontmatter stripped
  updatedDate: string;
  author: string;
  readingTime: string; // "6 min read"
};

export const getAllPosts = cache((): Post[] => {
  return POSTS.map((meta) => {
    const filePath = path.join(CONTENT_DIR, `${meta.slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(raw);
    const stats = readingTime(content);
    return {
      ...meta,
      content: content.trim(),
      updatedDate: (data.updatedDate as string) ?? meta.publishDate,
      author: (data.author as string) ?? "Arif Ahmed",
      readingTime: `${Math.max(1, Math.round(stats.minutes))} min read`,
    };
  }).sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1));
});

export const getPostBySlug = cache((slug: string): Post | undefined => {
  return getAllPosts().find((p) => p.slug === slug);
});

export const getAllSlugs = cache((): string[] => POSTS.map((p) => p.slug));

export const getRelatedPosts = cache((slug: string): Post[] => {
  const post = getPostBySlug(slug);
  if (!post) return [];
  const all = getAllPosts();
  return post.relatedSlugs
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is Post => Boolean(p));
});

export const getClusterPosts = cache((cluster: Cluster): Post[] => {
  return getAllPosts().filter((p) => p.cluster === cluster);
});

// ---------------------------------------------------------------------------
// Section parsing. All of it walks the same raw markdown MDXRemote renders,
// so JSON-LD and the "Key takeaways" card can never drift from what's on the
// page — there is no hand-copied text anywhere below.
// ---------------------------------------------------------------------------

function stripMarkdown(md: string): string {
  return md
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]*)\*\*/g, "$1")
    .replace(/\*([^*]*)\*/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .trim();
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits a post's body around its "## Key takeaways" section so the page
 * can render the takeaways list inside a bordered card and the rest of the
 * article through the normal MDX pipeline. Falls back to `{ before: content,
 * takeaways: null, after: "" }` if the section isn't present.
 */
export function splitKeyTakeaways(content: string): {
  before: string;
  takeaways: string | null;
  after: string;
} {
  const lines = content.split("\n");
  const startIdx = lines.findIndex((l) => /^##\s+Key takeaways\s*$/i.test(l.trim()));
  if (startIdx === -1) return { before: content, takeaways: null, after: "" };

  const endIdx = lines.findIndex((l, i) => i > startIdx && /^##\s+/.test(l));
  const takeawaysLines = lines.slice(startIdx + 1, endIdx === -1 ? undefined : endIdx);

  return {
    before: lines.slice(0, startIdx).join("\n").trim(),
    takeaways: takeawaysLines.join("\n").trim(),
    after: (endIdx === -1 ? [] : lines.slice(endIdx)).join("\n").trim(),
  };
}

export type FaqItem = { question: string; answer: string };

/** Extracts every H3 + following paragraph under "## Frequently asked questions". */
export function extractFAQs(content: string): FaqItem[] {
  const lines = content.split("\n");
  const startIdx = lines.findIndex((l) => /^##\s+Frequently asked questions\s*$/i.test(l.trim()));
  if (startIdx === -1) return [];
  const endIdx = lines.findIndex((l, i) => i > startIdx && /^##\s+/.test(l));
  const slice = lines.slice(startIdx + 1, endIdx === -1 ? undefined : endIdx);

  const faqs: FaqItem[] = [];
  let question: string | null = null;
  let answerLines: string[] = [];

  const flush = () => {
    if (question) {
      const answer = stripMarkdown(answerLines.join(" ").replace(/\s+/g, " ").trim());
      if (answer) faqs.push({ question: stripMarkdown(question), answer });
    }
    question = null;
    answerLines = [];
  };

  for (const line of slice) {
    const h3 = line.match(/^###\s+(.*)$/);
    if (h3) {
      flush();
      question = h3[1].trim();
      continue;
    }
    if (question && line.trim() && !/^-{3,}$/.test(line.trim())) answerLines.push(line.trim());
  }
  flush();

  return faqs;
}

export type HowToStep = { name: string; text: string };

/** Derives HowTo steps for the 5 posts that carry HowTo schema. See HOWTO_SOURCES. */
export function extractHowToSteps(slug: string, content: string): HowToStep[] {
  const source = HOWTO_SOURCES[slug];
  if (!source) return [];
  const lines = content.split("\n");

  if (source.mode === "h2-steps") {
    const steps: HowToStep[] = [];
    let name = "";
    let bodyLines: string[] = [];
    let collecting = false;

    const flush = () => {
      if (name) {
        const text = stripMarkdown(bodyLines.join(" ").replace(/\s+/g, " ").trim());
        if (text) steps.push({ name: stripMarkdown(name), text });
      }
      name = "";
      bodyLines = [];
    };

    for (const line of lines) {
      const h2 = line.match(/^##\s+(.*)$/);
      if (h2) {
        const heading = h2[1].trim();
        flush();
        if (source.pattern.test(heading)) {
          name = heading;
          collecting = true;
        } else {
          collecting = false;
        }
        continue;
      }
      if (collecting && line.trim()) bodyLines.push(line.trim());
    }
    flush();
    return steps;
  }

  const headingRegex = new RegExp(`^##\\s+${escapeRegExp(source.heading)}\\s*$`, "i");
  const headingIdx = lines.findIndex((l) => headingRegex.test(l.trim()));
  if (headingIdx === -1) return [];
  const nextH2Idx = lines.findIndex((l, i) => i > headingIdx && /^##\s+/.test(l));
  const slice = lines.slice(headingIdx + 1, nextH2Idx === -1 ? undefined : nextH2Idx);

  if (source.mode === "ordered-list") {
    const steps: HowToStep[] = [];
    for (const line of slice) {
      const item = line.match(/^\d+\.\s+(.*)$/);
      if (!item) continue;
      const text = item[1].trim();
      const bold = text.match(/^\*\*([^*]+)\*\*[:.]?\s*(.*)$/);
      if (bold) {
        const name = stripMarkdown(bold[1]);
        const rest = stripMarkdown(bold[2]).replace(/^[,;.]\s*/, "");
        steps.push({ name, text: rest || name });
      } else {
        const plain = stripMarkdown(text);
        steps.push({ name: plain.split(/[.:]/)[0].slice(0, 70), text: plain });
      }
    }
    return steps;
  }

  if (source.mode === "bold-numbered") {
    const steps: HowToStep[] = [];
    for (const line of slice) {
      const item = line.match(/^\*\*(\d+)\.\s*([^*]+?)\*\*\s*(.*)$/);
      if (!item) continue;
      const name = stripMarkdown(item[2]);
      const text = stripMarkdown(`${item[2]} ${item[3]}`.replace(/\s+/g, " ").trim());
      steps.push({ name, text });
    }
    return steps;
  }

  return [];
}
