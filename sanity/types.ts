import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";

export type Category = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  mainImage?: (Image & { alt?: string }) | null;
  category?: { title: string; slug: string } | null;
};

export type Post = PostListItem & {
  body?: PortableTextBlock[];
  author?: { name: string; image?: Image } | null;
  seo?: { title?: string; description?: string } | null;
};
