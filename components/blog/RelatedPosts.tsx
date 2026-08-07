import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/reveal";
import type { Post } from "@/lib/blog";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section aria-labelledby="related-posts-heading" className="py-16">
      <Reveal>
        <h2 id="related-posts-heading" className="font-display text-[28px] text-ink md:text-[32px]">
          Related reading
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
