import Split from "@/components/Split";
import WorkGrid, { type WorkItem } from "@/components/WorkGrid";
import { Close } from "@/components/blocks";
import { cases, films, seoWork } from "@/content/work";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Work: Websites, SEO, AI Tools and Films",
  description: "Selected work by Orvyn: websites for Nihal Healthcare and Doubleshot, AI tools, SEO content that grew traffic 10x, and short-form films for brands.",
  path: "/work",
  kicker: "Selected work",
});

const items: WorkItem[] = [
  ...cases.map((c) => ({ href: `/work/${c.slug}`, f: (c.kind === "Website" ? "web" : "ai") as WorkItem["f"], img: c.hero, alt: c.heroAlt, title: c.title, text: c.sum, tags: c.tags })),
  ...seoWork.map((w) => ({ href: "/services/seo", f: "seo" as const, img: w.img, alt: w.alt, typo: w.big ? { big: w.big, sub: w.sub! } : undefined, title: w.title, text: w.sum, tags: ["SEO", w.kind] })),
  ...films.map((f) => ({ href: "/films", f: "film" as const, img: f.poster, alt: f.alt, title: f.brand, text: f.label, tags: ["Film"], reel: true })),
];

export default function WorkPage() {
  return (
    <>
      <header className="phead wrap">
        <h1><Split text="Work" /><span className="count">({items.length})</span></h1>
        <p className="lead" data-fade>Websites, SEO, AI tools and films for brands in India and abroad. Every project links to the live thing.</p>
      </header>
      <div className="wrap"><WorkGrid items={items} /></div>
      <Close />
    </>
  );
}
