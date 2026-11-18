import Split from "@/components/Split";
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import { site, principles, faqHome } from "@/content/site";
import { services } from "@/content/services";

const phone = site.phone.replace(/ /g, " ");

export function Close() {
  return (
    <section className="s wrap" aria-labelledby="close-h">
      <div className="close">
        <h2 id="close-h">Have a project?</h2>
        <TransitionLink className="pill solid" href="/contact">Start a project <span className="arr">→</span></TransitionLink>
        <div className="contacts">
          <div><small>WhatsApp</small><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{phone}</a></div>
          <div><small>Email</small><a href={`mailto:${site.email}`}>{site.email}</a></div>
          <div><small>Studio</small>{site.city}</div>
        </div>
        <Image className="petal" src="/petals/bloom-pale.webp" alt="" width={56} height={56} style={{ ["--s" as string]: "56px", top: "16%", right: "12%", ["--d" as string]: "15s", ["--x" as string]: "-40px", ["--y" as string]: "60px" }} />
      </div>
    </section>
  );
}

export function ServiceList() {
  return (
    <div className="svc-list">
      {services.map((s) => (
        <TransitionLink key={s.slug} className="svc-row" href={`/services/${s.slug}`} data-img={s.img}>
          <h3>{s.title}{s.isNew && <span className="badge">New</span>}</h3>
          <p>{s.lead}</p>
          <span className="go" aria-hidden="true">→</span>
        </TransitionLink>
      ))}
    </div>
  );
}

export function Principles() {
  return (
    <div className="pgrid">
      {principles.map(([b, s]) => <div key={b}><b>{b}</b><span>{s}</span></div>)}
    </div>
  );
}

export function Faq({ items, id = "faq" }: { items: readonly (readonly [string, string])[]; id?: string }) {
  return (
    <div id={id}>
      {items.map(([q, a]) => (
        <details key={q}><summary>{q}</summary><p>{a}</p></details>
      ))}
    </div>
  );
}

export function faqLd(items: readonly (readonly [string, string])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export const homeFaq = faqHome;

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Card({ href, img, alt, typo, tags, title, text, reel, external }: { href: string; img?: string; alt?: string; typo?: { big: string; sub: string }; tags: string[]; title: string; text: string; reel?: boolean; external?: boolean }) {
  const inner = (
    <>
      <div className="clip">
        {img ? <Image className="im" src={img} alt={alt || ""} fill sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: external ? "left top" : "center" }} /> : typo ? <div className="typo" aria-hidden="true"><b>{typo.big}</b><span>{typo.sub}</span></div> : null}
      </div>
      <div className="meta">{tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
      <h3>{title}{external && <span aria-hidden="true"> ↗</span>}</h3>
      <p>{text}</p>
    </>
  );
  return external ? (
    <a className={`card${reel ? " reel" : ""}`} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <TransitionLink className={`card${reel ? " reel" : ""}`} href={href}>{inner}</TransitionLink>
  );
}

export function Footer() {
  return (
    <footer className="site">
      <div className="wrap foot">
        <div>
          <p style={{ font: "400 1.6rem/1.25 var(--disp)", maxWidth: "22ch" }}>Websites, SEO, films and AI tools, made in Gurgaon.</p>
          <a className="pill" style={{ marginTop: 20, display: "inline-flex" }} href={site.whatsapp} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
        </div>
        <div><h4>Studio</h4>
          <TransitionLink href="/work">Work</TransitionLink><TransitionLink href="/films">Films</TransitionLink><TransitionLink href="/process">Process</TransitionLink><TransitionLink href="/studio">Studio</TransitionLink><TransitionLink href="/journal">Journal</TransitionLink><TransitionLink href="/contact">Contact</TransitionLink>
        </div>
        <div><h4>Services</h4>
          {services.map((s) => <TransitionLink key={s.slug} href={`/services/${s.slug}`}>{s.title}</TransitionLink>)}
        </div>
        <div><h4>Contact</h4>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{phone}</a>
          <a href={`mailto:${site.email}?subject=Careers`}>Careers</a>
        </div>
      </div>
      <div className="giant" aria-hidden="true"><Split giant text="Orvyn" /></div>
      <div className="wrap fine">
        <span>© {new Date().getFullYear()} {site.name}, {site.city}</span>
        <span style={{ display: "flex", gap: 18 }}><TransitionLink href="/privacy">Privacy policy</TransitionLink><a href="#top">Back to top ↑</a></span>
        <span>Marigolds: Jane Loudon, c. 1843, Wellcome Collection</span>
      </div>
    </footer>
  );
}
