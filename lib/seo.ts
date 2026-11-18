import type { Metadata } from "next";
import { site } from "@/content/site";

/** One place that builds every page's title, description, canonical URL and preview image. */
export function pageMeta(opts: { title: string; description: string; path: string; kicker?: string; image?: string }): Metadata {
  const url = `${site.url}${opts.path}`;
  const og = opts.image ?? `/og?title=${encodeURIComponent(opts.title)}${opts.kicker ? `&kicker=${encodeURIComponent(opts.kicker)}` : ""}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${opts.title} | ${site.name}`,
      description: opts.description,
      locale: "en_IN",
      images: [{ url: og, width: 1200, height: 630, alt: `${opts.title}, ${site.name}` }],
    },
    twitter: { card: "summary_large_image", title: `${opts.title} | ${site.name}`, description: opts.description, images: [og] },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: "+919355170131",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
  areaServed: "IN",
  sameAs: [],
};
