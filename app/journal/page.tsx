import Split from "@/components/Split";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { Close } from "@/components/blocks";
import { notes } from "@/content/journal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Journal: Notes on Websites, SEO and Film",
  description: "Short, useful notes from Orvyn on what a website must do in its first seconds, local SEO for Gurgaon businesses, and why hypermotion reels work.",
  path: "/journal",
  kicker: "Journal",
});

export default function JournalPage() {
  return (
    <>
      <header className="phead wrap">
        <h1><Split text="Journal" /><span className="count">(0{notes.length})</span></h1>
        <p className="lead" data-fade>Short, useful notes on websites, search and short-form film.</p>
      </header>
      <div className="wrap"><div className="jgrid">
        {notes.map((n) => (
          <TransitionLink className="jcard" key={n.slug} href={`/journal/${n.slug}`}>
            <div className="clip"><Image className="im" src={n.img} alt={n.imgAlt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
            <span className="cap soft">{n.kind}</span><h2 style={{ fontSize: "1.75rem", lineHeight: 1.1 }}>{n.title}</h2>
          </TransitionLink>
        ))}
      </div></div>
      <Close />
    </>
  );
}
