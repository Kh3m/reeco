import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { sanityFetch } from "@/sanity/fetch";
import { CATEGORIES_QUERY, POSTS_QUERY } from "@/sanity/queries";
import type { Category, PostListItem } from "@/sanity/types";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/cn";

const PAGE_TITLE = "Insights — Strategy & Field Notes on Customer Growth";
const PAGE_DESCRIPTION =
  "Strategy, frameworks, and field notes on customer journeys, lifecycle marketing, retention, and growth.";

export const metadata: Metadata = {
  title: "Insights",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/insights" },
  // openGraph/twitter don't inherit page titles (shallow merge), so set fully.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "/insights",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors",
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-border text-muted hover:border-accent/40 hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? null;

  const [categories, posts] = await Promise.all([
    sanityFetch<Category[]>({
      query: CATEGORIES_QUERY,
      tags: ["category"],
      fallback: [],
    }),
    sanityFetch<PostListItem[]>({
      query: POSTS_QUERY,
      params: { category: activeCategory },
      tags: ["post"],
      fallback: [],
    }),
  ]);

  return (
    <main className="pt-16">
      <Section>
        <Eyebrow>Insights Hub</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl">
          Strategy, frameworks &amp; field notes on growing customers.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Insight on customer journeys, lifecycle marketing, retention, and the
          systems that drive sustainable growth.
        </p>

        {categories.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            <FilterChip href="/insights" active={!activeCategory}>
              All
            </FilterChip>
            {categories.map((cat) => (
              <FilterChip
                key={cat._id}
                href={`/insights?category=${cat.slug}`}
                active={activeCategory === cat.slug}
              >
                {cat.title}
              </FilterChip>
            ))}
          </div>
        )}

        {posts.length > 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-border bg-surface p-10 text-center">
            <p className="text-lg font-medium text-foreground">
              {activeCategory
                ? "No articles in this category yet."
                : "Insights are on the way."}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              We&apos;re publishing strategy and field notes soon. Subscribe to
              the newsletter to get them first.
            </p>
          </div>
        )}
      </Section>
    </main>
  );
}
