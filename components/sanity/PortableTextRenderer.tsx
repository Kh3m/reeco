import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "sanity";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-lg leading-8 text-muted">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-accent pl-6 text-xl italic leading-8 text-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-8 text-muted marker:text-accent">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-8 text-muted marker:text-accent">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent underline underline-offset-4 transition-colors hover:text-accent-soft"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
  types: {
    image: ({ value }) => {
      const img = value as Image & { alt?: string };
      if (!img?.asset) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlForImage(img).width(1600).url()}
          alt={img.alt ?? ""}
          className="mt-10 w-full rounded-2xl border border-border"
          loading="lazy"
        />
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
