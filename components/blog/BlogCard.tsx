import Link from "next/link";
import { format } from "date-fns";

import { CLUSTER_LABELS } from "@/lib/blog-registry";
import type { Post } from "@/lib/blog";
import { accentBg } from "@/lib/blog-colors";
import { cn } from "@/lib/utils";

export function BlogCard({ post, className }: { post: Post; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-canvasAlt p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <span aria-hidden className={cn("-mx-6 -mt-6 mb-5 h-1 w-[calc(100%+3rem)]", accentBg(post.accent))} />
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-inkMuted">
        {CLUSTER_LABELS[post.cluster]}
      </p>
      <h3 className="mt-3 font-display text-[22px] leading-[1.15] text-ink">{post.title}</h3>
      <p className="mt-3 line-clamp-2 text-[15px] leading-[1.6] text-inkBody">{post.metaDescription}</p>
      <div className="mt-5 flex items-center gap-2 text-[13px] text-inkMuted">
        <time dateTime={post.publishDate}>{format(new Date(post.publishDate), "d MMM yyyy")}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );
}
