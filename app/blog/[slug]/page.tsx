import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { ClusterNav } from "@/components/blog/ClusterNav";
import { JsonLd } from "@/components/blog/JsonLd";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareRow } from "@/components/blog/ShareRow";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { GrainOverlay } from "@/components/illustrations/grain-overlay";
import { Footer } from "@/components/sections/footer";
import { Nav } from "@/components/sections/nav";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import {
  extractFAQs,
  extractHowToSteps,
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  splitKeyTakeaways,
} from "@/lib/blog";
import { HOWTO_SOURCES } from "@/lib/blog-registry";
import { site } from "@/lib/content";
import { articleMdxOptions } from "@/lib/mdx-options";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${site.url}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.publishDate,
      modifiedTime: post.updatedDate,
      ...(post.author ? { authors: [post.author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { before, takeaways, after } = splitKeyTakeaways(post.content);
  const faqs = extractFAQs(post.content);
  const howToSteps = HOWTO_SOURCES[post.slug] ? extractHowToSteps(post.slug, post.content) : [];
  const related = getRelatedPosts(post.slug);
  const url = `${site.url}/blog/${post.slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishDate,
    dateModified: post.updatedDate,
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: url,
    url,
  };

  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const howToJsonLd = howToSteps.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.title,
        step: howToSteps.map((s) => ({
          "@type": "HowToStep",
          name: s.name,
          text: s.text,
        })),
      }
    : null;

  return (
    <>
      <Nav solid />
      <ReadingProgress containerId="article-content" accent={post.accent} />
      <main>
        <div className="mx-auto max-w-shell px-6">
          <ArticleHeader post={post} />

          <div className="grid min-w-0 gap-12 pb-8 pt-8 lg:grid-cols-[680px_1fr]">
            <article id="article-content" className="min-w-0 max-w-[680px]">
              <MDXRemote source={before} options={articleMdxOptions} components={mdxComponents} />
              {takeaways && <KeyTakeaways markdown={takeaways} accent={post.accent} />}
              <MDXRemote source={after} options={articleMdxOptions} components={mdxComponents} />

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
                <Link
                  href="/blog"
                  className="text-[13px] text-inkMuted transition-colors hover:text-ink"
                >
                  ← Back to writing
                </Link>
                <ShareRow url={url} title={post.title} />
              </div>

              <BlogCTA />
            </article>

            <TableOfContents containerId="article-content" accent={post.accent} />
          </div>

          <ClusterNav currentCluster={post.cluster} />
          <RelatedPosts posts={related} />
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
      <GrainOverlay />

      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={blogPostingJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      {howToJsonLd && <JsonLd data={howToJsonLd} />}
    </>
  );
}
