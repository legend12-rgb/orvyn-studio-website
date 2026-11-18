import Split from "@/components/Split";
import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { Close, Faq, JsonLd, Principles, ServiceList, faqLd } from "@/components/blocks";
import { cases } from "@/content/work";
import { faqHome, steps, site } from "@/content/site";
import { notes } from "@/content/journal";
import { pageMeta } from "@/lib/seo";

export const metadata = {
  ...pageMeta({ title: "Websites, SEO, Films and AI Tools in Gurgaon", description: site.description, path: "/", kicker: "Creative studio, Gurgaon" }),
  title: { absolute: `${site.name}: Websites, SEO, Films and AI Tools in Gurgaon` },
};

const P = (s: Record<string, string>) => s as React.CSSProperties;

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="hmid">
          <div className="status"><span><span className="dot" aria-hidden="true" />Taking new projects</span><span>Gurgaon, <span data-clock>--:--</span> IST</span></div>
          <h1 className="wm" aria-label="Orvyn Solutions"><span className="dev" aria-hidden="true">ओ</span><Split text="Orvyn" /><sup aria-hidden="true">(studio)</sup></h1>
        </div>
        <div className="hfoot">
          <p>{site.tagline}</p>
          <TransitionLink className="pill" href="/work">See the work <span className="arr">→</span></TransitionLink>
        </div>
        <Image className="petal" src="/petals/bloom-pale.webp" alt="" width={60} height={60} priority style={P({ "--s": "60px", top: "22%", left: "68%", "--d": "13s", "--x": "-60px", "--y": "70px" })} />
        <Image className="petal" src="/petals/bloom-pale.webp" alt="" width={42} height={42} style={P({ "--s": "42px", top: "15%", left: "82%", "--d": "17s", "--x": "50px", "--y": "90px" })} />
        <Image className="petal" src="/petals/bloom-marigold-a.webp" alt="" width={74} height={74} style={P({ "--s": "74px", top: "64%", left: "9%", "--d": "15s", "--x": "40px", "--y": "-50px" })} />
      </header>

      <section className="reel-sec" aria-label="Showreel">
        <div className="reel-stick">
          <div className="reel-frame" data-reel>
            <video src="/films/showreel.mp4" poster="/films/showreel-poster.jpg" muted loop playsInline autoPlay preload="metadata" aria-label="Orvyn showreel: the Doubleshot brand film and a perfume product film" />
            <div className="reel-label"><span data-reel-label>Made to be watched</span></div>
          </div>
          <div className="reel-cap"><span>Showreel 2026</span><span>Doubleshot, studio demo</span></div>
        </div>
      </section>

      <section className="stmt-sec" data-stmt>
        <div className="stmt-stick wrap">
          <p className="stmt" data-stmt-text>
            A Gurgaon studio building{" "}
            <span className="nw"><span className="chip" style={{ backgroundImage: "url(/work/nihal-site.jpg)" }} />&nbsp;websites,</span>{" "}
            <span className="nw"><span className="chip" style={{ backgroundImage: "url(/work/coloressence-hypermotion-reel-1.jpg)" }} />&nbsp;films</span> and{" "}
            <span className="nw"><span className="chip" style={{ backgroundImage: "url(/work/sketch-to-ui-cover.webp)" }} />&nbsp;AI</span> tools that people <span className="mark">remember</span>.
          </p>
          <p className="stmt-cap" data-stmt-cap>Small studio. Senior craft. You talk to the person doing the work.</p>
        </div>
      </section>

      <section className="wrap" aria-labelledby="work-h">
        <div className="sec-head"><h2 id="work-h"><Split lines text="Selected work" /></h2><TransitionLink href="/work">All work <span aria-hidden="true">→</span></TransitionLink></div>
        <div className="stack">
          {cases.map((c, i) => (
            <TransitionLink className="scard" key={c.slug} href={`/work/${c.slug}`}>
              <div className="clip"><Image className="im" src={c.hero} alt={c.heroAlt} fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: "cover" }} /></div>
              <div className="info">
                <span className="num">0{i + 1} / 0{cases.length}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.sum}</p>
                  <div className="meta">{c.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                  <span className="view-link">View case <span className="arr">→</span></span>
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      <section className="s wrap" aria-labelledby="svc-h">
        <div className="sec-head"><h2 id="svc-h"><Split lines text="Services" /></h2><TransitionLink href="/services">What each includes</TransitionLink></div>
        <ServiceList />
      </section>

      {/* wrapper owned by React: GSAP pins the inner section and inserts a pin-spacer around it */}
      <div className="proc-wrap">
      <section className="proc-sec" data-proc aria-labelledby="proc-h">
        <div className="wrap sec-head" style={{ marginBottom: 34 }}><h2 id="proc-h"><Split lines text="How a project runs" /></h2><TransitionLink href="/process">The full process</TransitionLink></div>
        <div className="proc-track" data-proc-track>
          {steps.map((s) => (
            <div className="step" key={s.n}><span className="n">{s.n}</span><div><h3>{s.t}</h3><p style={{ marginTop: 8 }}>{s.p}</p></div><small>{s.w}</small></div>
          ))}
        </div>
      </section>
      </div>

      <section className="s wrap" aria-label="Results">
        <div className="proof">
          <div><span className="bign" data-count="15">15</span><p className="soft" style={{ font: "400 1.2rem/1.3 var(--disp)" }}>pieces of shipped work</p></div>
          <div className="facts">
            <div><b>23+</b><span>product variants, each with its own page, for Nihal Healthcare</span></div>
            <div><b>4 cities</b><span>in one scroll for Doubleshot Coffee Roasters</span></div>
            <div><b>Under 1 min</b><span>from a hand sketch to a working page with Sketch to UI</span></div>
            <div><b>5 films</b><span>across hypermotion, UGC and product formats</span></div>
            <div><b>10x</b><span>monthly views for SocialiteSpaces, from about 100 to 1,025+</span></div>
            <div><b>2 outlets</b><span>ThePrint and The Tribune features for Boon Doors</span></div>
          </div>
        </div>
        <svg className="curve" viewBox="0 0 1200 220" role="img" aria-label="Clients: Doubleshot, Nihal Healthcare, Coloressence, Boon Doors, Metro Locksmiths, SocialiteSpaces">
          <defs><path id="wave" d="M-40 150 C 200 40, 420 40, 600 120 S 1000 210, 1240 90" /></defs>
          <text><textPath href="#wave" data-curve startOffset="40">Doubleshot  ✳  Nihal Healthcare  ✳  Coloressence  ✳  Boon Doors  ✳  Metro Locksmiths  ✳  SocialiteSpaces</textPath></text>
        </svg>
      </section>

      <section className="s wrap principles" aria-labelledby="pr-h">
        <h2 id="pr-h"><Split fill text="Talk to the maker. See it live. Keep everything." /></h2>
        <Principles />
      </section>

      <section className="s wrap" aria-labelledby="faq-h">
        <div className="faq-grid">
          <div><h2 id="faq-h" style={{ fontSize: "var(--step-h2)", lineHeight: 0.95 }}><Split lines text="Questions" /></h2><p className="soft" style={{ marginTop: 18, maxWidth: "30ch" }}>Anything else, ask on WhatsApp. You will get a real answer from the person doing the work.</p></div>
          <Faq items={faqHome} />
        </div>
        <JsonLd data={faqLd(faqHome)} />
      </section>

      <section className="s wrap" aria-labelledby="j-h">
        <div className="sec-head"><h2 id="j-h"><Split lines text="Journal" /></h2><TransitionLink href="/journal">All notes</TransitionLink></div>
        <div className="jgrid">
          {notes.map((n) => (
            <TransitionLink className="jcard" key={n.slug} href={`/journal/${n.slug}`}>
              <div className="clip"><Image className="im" src={n.img} alt={n.imgAlt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} /></div>
              <span className="cap soft">{n.kind}</span><h3>{n.title}</h3>
            </TransitionLink>
          ))}
        </div>
      </section>

      <Close />
    </>
  );
}
