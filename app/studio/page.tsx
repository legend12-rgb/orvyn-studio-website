import Split from "@/components/Split";
import { Close, Principles } from "@/components/blocks";
import TransitionLink from "@/components/TransitionLink";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Studio: About Orvyn",
  description: "Orvyn is a small creative studio in Gurgaon. You talk to the person doing the work, see progress on a live link every week, and keep everything at the end.",
  path: "/studio",
  kicker: "About the studio",
});

export default function StudioPage() {
  return (
    <>
      <header className="phead wrap"><h1><Split text="Studio" /><span className="count">(gurgaon)</span></h1></header>
      <section className="wrap about-grid">
        <div>
          <p>Orvyn is a small studio in Gurgaon. We design and build websites, grow them through SEO, make short films, and build AI tools for brands that would rather be remembered than blend in.</p>
          <p>You talk to the person doing the work. Projects run on WhatsApp, show progress on a live link every week, and end with something live, measurable and yours to keep.</p>
          <p>See the <TransitionLink href="/work">work</TransitionLink>, how a project <TransitionLink href="/process">runs</TransitionLink>, or <TransitionLink href="/contact">start a project</TransitionLink>.</p>
        </div>
        <div className="kv">
          <div><span className="cap soft">Studio</span>Gurgaon, India</div>
          <div><span className="cap soft">Work with</span>Small and growing brands in India and abroad</div>
          <div><span className="cap soft">Built with</span>Next.js, GSAP, AI video and vision models</div>
          <div><span className="cap soft">Local time</span><span><span data-clock>--:--</span> IST</span></div>
        </div>
      </section>
      <section className="s wrap principles" aria-labelledby="sp"><h2 id="sp"><Split fill text="Talk to the maker. See it live. Keep everything." /></h2><Principles /></section>
      <Close />
    </>
  );
}
