import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PortableTextRenderer } from "@/components/sanity/PortableTextRenderer";
import { IconArrowRight } from "@/components/ui/icons";
import { sanityFetch } from "@/sanity/fetch";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import { urlForImage } from "@/sanity/image";
import { formatDate } from "@/lib/format";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { Post } from "@/sanity/types";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: POST_SLUGS_QUERY,
    fallback: [],
  });
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
    fallback: null,
  });
  if (!post) return {};
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  const ogImage = post.mainImage
    ? urlForImage(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title,
      description,
      url: `/insights/${slug}`,
      publishedTime: post.publishedAt,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>({
    query: POST_QUERY,
    params: { slug },
    tags: ["post", `post:${slug}`],
    fallback: null,
  });

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(post.author
      ? { author: { "@type": "Person", name: post.author.name } }
      : {}),
    ...(post.mainImage
      ? {
          image: urlForImage(post.mainImage)
            .width(1200)
            .height(630)
            .fit("crop")
            .url(),
        }
      : {}),
  };

  return (
    <main className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <IconArrowRight className="h-4 w-4 rotate-180" />
            All insights
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em]">
            {post.category && (
              <span className="font-medium text-accent">
                {post.category.title}
              </span>
            )}
            {post.publishedAt && (
              <>
                <span aria-hidden className="text-faint">
                  ·
                </span>
                <span className="text-faint">
                  {formatDate(post.publishedAt)}
                </span>
              </>
            )}
          </div>

          <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-xl leading-8 text-muted">{post.excerpt}</p>
          )}

          {post.mainImage && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
              <Image
                src={urlForImage(post.mainImage)
                  .width(1600)
                  .height(900)
                  .fit("crop")
                  .url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {post.body && (
            <div className="mt-10">
              <PortableTextRenderer value={post.body} />
            </div>
          )}

          {post.author && (
            <div className="mt-16 flex items-center gap-4 border-t border-border pt-8">
              {post.author.image && (
                <Image
                  src={urlForImage(post.author.image)
                    .width(96)
                    .height(96)
                    .fit("crop")
                    .url()}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-faint">
                  Written by
                </p>
                <p className="text-sm font-medium text-foreground">
                  {post.author.name}
                </p>
              </div>
            </div>
          )}
        </Container>
      </article>
    </main>
  );
}
