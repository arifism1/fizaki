import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllPosts } from "@/lib/blog";
import type { Heading } from "@/lib/content";

const heading: Heading = [
  { text: "From the " },
  { text: "blog", italic: true },
  { text: "." },
] as const;

export function LatestWriting() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;

  return (
    <Section id="writing" labelledBy="writing-heading" tone="canvas">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <SectionHeading
            id="writing-heading"
            eyebrow="Latest writing"
            title={heading}
            subtitle="Practical guides on lead response, WhatsApp automation and local marketing."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-inkBody"
          >
            View all posts
            <ArrowRight size={15} aria-hidden />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={0.08 * i}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
