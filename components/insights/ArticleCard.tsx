import Link from "next/link";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";
import { formatDate } from "@/lib/format";
import type { PostListItem } from "@/sanity/types";

export function ArticleCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-accent/40"
    >
      {post.mainImage ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={urlForImage(post.mainImage)
              .width(800)
              .height(450)
              .fit("crop")
              .url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-surface-2 to-background" />
      )}

      <div className="flex flex-1 flex-col p-6">
        {post.category && (
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {post.category.title}
          </span>
        )}
        <h3 className="mt-3 text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">
            {post.excerpt}
          </p>
        )}
        {post.publishedAt && (
          <span className="mt-4 text-xs text-faint">
            {formatDate(post.publishedAt)}
          </span>
        )}
      </div>
    </Link>
  );
}
