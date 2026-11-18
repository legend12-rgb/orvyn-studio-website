import Split from "@/components/Split";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { Card, Close, Faq, JsonLd, faqLd } from "@/components/blocks";
import { services, serviceBySlug } from "@/content/services";
import { caseBySlug, films, seoWork } from "@/content/work";
import { pageMeta } from "@/lib/seo";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, kicker: "Service" });
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const related = s.related.map(caseBySlug).filter(Boolean);
  const serviceLd = { "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.metaDescription, provider: { "@type": "ProfessionalService", name: site.name, url: site.url }, areaServed: "IN" };
  return (
    <>
      <header className="phead wrap">
        <nav className="crumb" aria-label="Breadcrumb"><TransitionLink href="/services">Services</TransitionLink><span aria-hidden="true">/</span><span aria-current="page">{s.title}</span></nav>
        <h1><Split text={s.title} />{s.isNew && <span className="badge" style={{ fontSize: "0.78rem", verticalAlign: "middle", letterSpacing: ".08em" }}>New</span>}</h1>
        <p className="lead" data-fade>{s.lead}</p>
        <div style={{ marginTop: 28 }} data-fade><TransitionLink className="pill solid" href="/contact">Start a project <span className="arr">→</span></TransitionLink></div>
      </header>
      <section className="wrap svc-grid">
        <div><h2 className="h2s">What you get</h2><div className="includes">{s.includes.map(([b, t]) => <div key={b}><b>{b}</b><span>{t}</span></div>)}</div></div>
        <div><h2 className="h2s">Questions</h2><Faq items={s.faq} /></div>
      </section>

      {s.showSeoWork && (
        <section className="s wrap" aria-labelledby="seo-work">
          <div className="sec-head"><h2 id="seo-work">SEO and content work</h2></div>
          <div className="wgrid seo-grid">
            {seoWork.map((w) => (
              <Card key={w.title} href={w.url} external img={w.img} alt={w.alt} typo={w.big ? { big: w.big, sub: w.sub! } : undefined} tags={[w.kind]} title={w.title} text={w.sum} />
            ))}
          </div>
        </section>
      )}
      {s.showFilms && (
        <section className="s wrap" aria-labelledby="rel">
          <div className="sec-head"><h2 id="rel">Related work</h2><TransitionLink href="/films">All films</TransitionLink></div>
          <div className="wgrid">{films.slice(0, 2).map((f) => <Card key={f.src} href="/films" img={f.poster} alt={f.alt} tags={["Film"]} title={f.brand} text={f.label} reel />)}</div>
        </section>
      )}
      {related.length > 0 && (
        <section className="s wrap" aria-labelledby="rel2">
          <div className="sec-head"><h2 id="rel2">Related work</h2><TransitionLink href="/work">All work</TransitionLink></div>
          <div className="wgrid">{related.map((c) => <Card key={c!.slug} href={`/work/${c!.slug}`} img={c!.hero} alt={c!.heroAlt} tags={c!.tags} title={c!.title} text={c!.sum} />)}</div>
        </section>
      )}

      <section className="wrap" aria-label="Other services" style={{ paddingTop: 40 }}>
        <p className="soft">Other services:{" "}
          {services.filter((x) => x.slug !== s.slug).map((x, i, arr) => (
            <span key={x.slug}><TransitionLink href={`/services/${x.slug}`}>{x.title}</TransitionLink>{i < arr.length - 1 ? ", " : "."}</span>
          ))}
        </p>
      </section>
      <Close />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd(s.faq)} />
    </>
  );
}
