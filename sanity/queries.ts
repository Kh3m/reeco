import { defineQuery } from "next-sanity";

const postListProjection = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "publishedAt": coalesce(publishedAt, _createdAt),
  mainImage,
  "category": category->{title, "slug": slug.current}
`;

/** All published posts, newest first. Optionally filtered by category slug. */
export const POSTS_QUERY = defineQuery(`*[
  _type == "post" && defined(slug.current)
  && (!defined($category) || category->slug.current == $category)
] | order(coalesce(publishedAt, _createdAt) desc){${postListProjection}}`);

/** The most recent posts, for the homepage Insights preview. */
export const LATEST_POSTS_QUERY = defineQuery(`*[
  _type == "post" && defined(slug.current)
] | order(coalesce(publishedAt, _createdAt) desc)[0...3]{${postListProjection}}`);

/** All categories, alphabetical. */
export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"]
  | order(title asc){ _id, title, "slug": slug.current, description }`);

/** A single post by slug. */
export const POST_QUERY = defineQuery(`*[
  _type == "post" && slug.current == $slug
][0]{
  ${postListProjection},
  body,
  "author": author->{name, image},
  seo
}`);

/** Slugs for static generation. */
export const POST_SLUGS_QUERY = defineQuery(`*[
  _type == "post" && defined(slug.current)
]{ "slug": slug.current }`);

/** Editable global site copy (singleton). */
export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  heroHeading, heroSubheading, aboutHeading, aboutBody
}`);
