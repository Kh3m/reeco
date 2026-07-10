import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

/** Image URL builder for a Sanity image reference. Chain .width()/.url() etc. */
export function urlForImage(source: Image) {
  return builder.image(source).auto("format");
}
