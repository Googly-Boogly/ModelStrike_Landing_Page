import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/services". Used for the canonical URL and og:url. */
  path: string;
};

/**
 * Per-page metadata with canonical, Open Graph, and Twitter fields kept in
 * sync. The share image comes from `app/opengraph-image.tsx` automatically.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
