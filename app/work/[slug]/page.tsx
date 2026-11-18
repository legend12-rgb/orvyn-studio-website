import Split from "@/components/Split";
import Image from "next/image";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { Close, JsonLd } from "@/components/blocks";
import { cases, caseBySlug } from "@/content/work";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const c = caseBySlug((await params).slug);
  if (!c) return {};
  return pageMeta({ title: `${c.title}: ${c.kind} case study`, description: c.sum, path: `/work/${c.slug}`, kicker: `${c.kind} case study` });
}

export default async function CasePage({ params }: Props) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  const next = caseBySlug(c.next)!;
  const crumbs = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 2, name: c.title, item: `${site.url}/work/${c.slug}` },
    ],
  };
  return (
    <>
      <header className="phead wrap">
        <nav className="crumb" aria-label="Breadcrumb"><TransitionLink href="/work">Work</TransitionLink><span aria-hidden="true">/</span><span aria-current="page">{c.title}</span></nav>
        <h1><Split text={c.title} /></h1>
        <p className="lead" data-fade>{c.sum}</p>
        <div className="case-meta" data-fade>
          {c.meta.map(([k, v]) => <div key={k}><span className="cap soft">{k}</span><b>{v}</b></div>)}
          <div><span className="cap soft">Live</span><a href={c.url} target="_blank" rel="noopener noreferrer"><b>{c.urlLabel} ↗</b></a></div>
        </div>
      </header>
      <div className="wrap"><div className="clip case-hero"><Image className="im" src={c.hero} alt={c.heroAlt} fill priority sizes="100vw" style={{ objectFit: "cover" }} /></div></div>
      <div className="wrap">
        {c.story.map(([h, ps]) => (
          <section className="story" key={h}><h2>{h}</h2><div>{ps.map((p) => <p key={p}>{p}</p>)}</div></section>
        ))}
      </div>
      <div className="wrap"><div className="gallery">
        {c.gallery.map((g) => (
          <div className="clip" key={g.src}><Image className="im" src={g.src} alt={g.alt} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} /></div>
        ))}
      </div></div>
      <div className="wrap"><TransitionLink className="next" href={`/work/${next.slug}`}><span className="cap soft">Next project</span><span>{next.title}</span></TransitionLink></div>
      <Close />
      <JsonLd data={crumbs} />
    </>
  );
}
