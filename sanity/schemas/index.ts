import type { SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import { category } from "./category";
import { author } from "./author";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  category,
  author,
  siteSettings,
];
