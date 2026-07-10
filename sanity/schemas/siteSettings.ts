import { defineField, defineType } from "sanity";

/**
 * Editable global copy (singleton). Lets marketing tweak key on-page text
 * without code. Front-end wiring of these fields is incremental — the schema
 * exists so the content is owned in the CMS from day one.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "aboutHeading",
      title: "About heading",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "About body",
      type: "text",
      rows: 4,
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
