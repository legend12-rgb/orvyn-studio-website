import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Tiro_Devanagari_Hindi } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import Shutter from "@/components/Shutter";
import SmoothScroll from "@/components/SmoothScroll";
import Motion from "@/components/Motion";
import Chrome from "@/components/Chrome";
import Analytics from "@/components/Analytics";
import { Footer, JsonLd } from "@/components/blocks";
import { site } from "@/content/site";
import { organizationLd } from "@/lib/seo";

const disp = localFont({ src: "../fonts/Gambarino-400.woff2", weight: "400", variable: "--font-disp", display: "swap" });
const body = localFont({
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500" },
    { path: "../fonts/Satoshi-700.woff2", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});
const dev = Tiro_Devanagari_Hindi({ weight: "400", subsets: ["devanagari"], variable: "--font-dev", display: "swap" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#E8B208" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Websites, SEO, Films and AI Tools in Gurgaon`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  openGraph: { type: "website", siteName: site.name, locale: "en_IN", images: [{ url: "/og?title=Orvyn", width: 1200, height: 630, alt: site.name }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" className={`${disp.variable} ${body.variable} ${dev.variable}`}>
      <body id="top">
        <a className="skip" href="#content">Skip to content</a>
        <Chrome />
        <Nav />
        <main id="content" tabIndex={-1}>{children}</main>
        <Footer />
        <Shutter />
        <SmoothScroll />
        <Motion />
        <Analytics />
        <JsonLd data={organizationLd} />
      </body>
    </html>
  );
}
