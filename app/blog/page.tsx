import type { Metadata } from "next";

import { BlogHero } from "@/components/blog/BlogHero";
import { JsonLd } from "@/components/blog/JsonLd";
import { GrainOverlay } from "@/components/illustrations/grain-overlay";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/content";

const title = "Blog — arifwork";
const description =
  "Guides on missed calls, WhatsApp automation, Google reviews and lead conversion for local service businesses in India.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${site.url}/blog`,
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <Nav solid />
      <main>
        <div className="mx-auto max-w-shell px-6 pb-24">
          <BlogHero posts={posts} />
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
      <GrainOverlay />

      <JsonLd data={collectionJsonLd} />
      <JsonLd data={itemListJsonLd} />
    </>
  );
}
