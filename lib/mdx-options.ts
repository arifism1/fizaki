import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/** Shared next-mdx-remote/rsc compile options for full article bodies. */
export const articleMdxOptions: NonNullable<MDXRemoteProps["options"]> = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          test: (node: { tagName?: string }) => node.tagName === "h2",
          properties: { className: ["heading-anchor-link"] },
          content: () => [{ type: "text" as const, value: "" }],
        },
      ],
      [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
    ],
  },
};
