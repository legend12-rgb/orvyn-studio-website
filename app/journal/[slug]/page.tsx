import Split from "@/components/Split";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { Close, JsonLd } from "@/components/blocks";
import { notes, noteBySlug } from "@/content/journal";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return notes.map((n) => ({ slug: n.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const n = noteBySlug((await params).slug);
  if (!n) return {};
  return pageMeta({ title: n.title, description: n.description, path: `/journal/${n.slug}`, kicker: `Journal, ${n.kind}` });
}

export default async function NotePage({ params }: Props) {
  const n = noteBySlug((await params).slug);
  if (!n) notFound();
  const others = notes.filter((x) => x.slug !== n.slug);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: n.title, description: n.description, datePublished: n.date, image: `${site.url}${n.img}`, author: { "@type": "Organization", name: site.name }, publisher: { "@type": "Organization", name: site.name } };
  return (
    <>
      <header className="phead wrap">
        <nav className="crumb" aria-label="Breadcrumb"><TransitionLink href="/journal">Journal</TransitionLink><span aria-hidden="true">/</span><span aria-current="page">{n.kind}</span></nav>
        <h1 style={{ fontSize: "clamp(2.8rem,7vw,5.6rem)" }}><Split text={n.title} /></h1>
      </header>
      <article className="wrap"><div className="article">
        {n.body.map((b, i) => b.h ? <h2 key={i}>{b.h}</h2> : b.ol ? <ol key={i}>{b.ol.map((li) => <li key={li}>{li}</li>)}</ol> : <p key={i}>{b.p}</p>)}
        <p className="soft" style={{ marginTop: 40 }}>Keep reading: {others.map((o, i) => <span key={o.slug}><TransitionLink href={`/journal/${o.slug}`}>{o.title}</TransitionLink>{i < others.length - 1 ? ", or " : "."}</span>)}</p>
      </div></article>
      <Close />
      <JsonLd data={ld} />
    </>
  );
}
