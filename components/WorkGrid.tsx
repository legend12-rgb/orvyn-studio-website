"use client";
import { useState } from "react";
import { Card } from "./blocks";

export type WorkItem = { href: string; f: "web" | "ai" | "film" | "seo"; img?: string; alt?: string; typo?: { big: string; sub: string }; title: string; text: string; tags: string[]; reel?: boolean };

const FILTERS: [string, string][] = [["all", "All"], ["web", "Websites"], ["seo", "SEO"], ["ai", "AI tools"], ["film", "Films"]];

export default function WorkGrid({ items }: { items: WorkItem[] }) {
  const [f, setF] = useState("all");
  const shown = items.filter((w) => f === "all" || w.f === f);
  return (
    <>
      <div className="filters" role="group" aria-label="Filter work">
        {FILTERS.map(([k, label]) => (
          <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{label}</button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">{shown.length} projects shown</p>
      <div className="wgrid">
        {shown.map((w) => <Card key={w.title + w.href} {...w} />)}
      </div>
    </>
  );
}
