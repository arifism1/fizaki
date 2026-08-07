"use client";

import { useMemo, useState } from "react";

import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/reveal";
import type { Post } from "@/lib/blog";
import type { Cluster } from "@/lib/blog-registry";
import { cn } from "@/lib/utils";

type Filter = "all" | Cluster;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "lead-response", label: "Lead response" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "local-marketing", label: "Local marketing" },
  { key: "verticals", label: "Industries" },
];

export function BlogHero({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.cluster === filter)),
    [posts, filter],
  );

  const [featured, ...rest] = filtered;

  return (
    <div className="pt-32 md:pt-40">
      <Reveal>
        <h1 className="display-tight font-display text-[42px] font-normal leading-[1.05] text-ink md:text-[64px]">
          Writing
        </h1>
        <p className="mt-4 max-w-[560px] text-[17px] leading-[1.65] text-inkBody md:text-[19px]">
          Practical guides on lead response, WhatsApp automation and local marketing for Indian
          service businesses.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
                filter === f.key
                  ? "border-ink bg-ink text-white"
                  : "border-hairline text-inkBody hover:border-ink/30 hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      {featured && (
        <Reveal delay={0.15}>
          <div className="mt-12">
            <BlogCard post={featured} className="md:p-8" />
          </div>
        </Reveal>
      )}

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i * 0.06, 0.3)}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-[15px] text-inkMuted">No posts in this category yet.</p>
      )}
    </div>
  );
}
