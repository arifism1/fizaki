import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { accentBg } from "@/lib/blog-colors";
import { cn } from "@/lib/utils";

/**
 * Renders the article's "## Key takeaways" bullet list inside a bordered
 * card. `markdown` is just the bullet-list source (heading already
 * stripped by lib/blog.ts's splitKeyTakeaways) so bold spans etc. inside
 * each bullet still render correctly instead of being flattened to text.
 */
export async function KeyTakeaways({
  markdown,
  accent,
}: {
  markdown: string;
  accent: string;
}) {
  if (!markdown.trim()) return null;

  return (
    <div className="my-10 rounded-2xl border border-hairline bg-canvasAlt p-6 md:p-8">
      <p className="mb-4 text-[12px] font-semibold uppercase tracking-widest text-inkMuted">
        Key takeaways
      </p>
      <MDXRemote
        source={markdown}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        components={{
          ul: ({ children }) => <ul className="space-y-3">{children}</ul>,
          li: ({ children }) => (
            <li className="relative pl-5 text-[16px] leading-[1.7] text-inkBody">
              <span
                aria-hidden
                className={cn("absolute left-0 top-[0.65em] h-1.5 w-1.5 rounded-full", accentBg(accent))}
              />
              {children}
            </li>
          ),
          strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
          p: ({ children }) => <p className="mb-0">{children}</p>,
          code: ({ children }) => (
            <code className="rounded-md border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[0.85em] text-inkBody">
              {children}
            </code>
          ),
        }}
      />
    </div>
  );
}
