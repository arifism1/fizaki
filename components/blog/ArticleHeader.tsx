import { format } from "date-fns";

import { DottedDivider } from "@/components/ui/dotted-divider";
import { CLUSTER_LABELS } from "@/lib/blog-registry";
import type { Post } from "@/lib/blog";

function formatDate(iso: string): string {
  return format(new Date(iso), "d MMMM yyyy");
}

export function ArticleHeader({ post }: { post: Post }) {
  const hasUpdate = post.updatedDate !== post.publishDate;

  return (
    <header className="max-w-[680px] pt-32 md:pt-40">
      <p className="eyebrow">{CLUSTER_LABELS[post.cluster]}</p>
      <h1 className="display-tight mt-4 font-display text-[42px] font-normal leading-[1.05] text-ink md:text-[56px]">
        {post.title}
      </h1>
      <p className="mt-6 text-[19px] leading-[1.6] text-inkBody">{post.metaDescription}</p>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-inkMuted">
        <span>{post.author}</span>
        <span aria-hidden>·</span>
        <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
        {hasUpdate && (
          <>
            <span aria-hidden>·</span>
            <span>Last updated {formatDate(post.updatedDate)}</span>
          </>
        )}
      </div>

      <DottedDivider className="mt-10" />
    </header>
  );
}
