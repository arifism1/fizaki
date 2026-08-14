import { ImageResponse } from "next/og";

import { CLUSTER_LABELS } from "@/lib/blog-registry";
import { accentHex } from "@/lib/blog-colors";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

// Node runtime (not edge): getPostBySlug reads content/blog/*.md from disk,
// which the edge runtime can't do.
export const alt = "fizaki — blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const accent = accentHex(post?.accent ?? "brandBlue");
  const title = post?.title ?? "fizaki";
  const cluster = post ? CLUSTER_LABELS[post.cluster] : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F7F7F5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", width: "100%", height: "12px", backgroundColor: accent }} />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "56px",
              lineHeight: 1.15,
              fontWeight: 500,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              color: "#0F0F0F",
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 80px 64px",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: 600,
              fontStyle: "italic",
              color: "#0F0F0F",
              letterSpacing: "-0.01em",
            }}
          >
            fizaki
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#8E8E8E",
            }}
          >
            {cluster}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
