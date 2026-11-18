import Split from "@/components/Split";
import { Close, Principles } from "@/components/blocks";
import TransitionLink from "@/components/TransitionLink";
import { steps } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Process: How a Project Runs",
  description: "Six steps from first call to growth: call, plan, design, build, launch and grow, with one person to talk to and a live link from the first week.",
  path: "/process",
  kicker: "Process",
});

export default function ProcessPage() {
  return (
    <>
      <header className="phead wrap">
        <h1><Split text="Process" /><span className="count">(06)</span></h1>
        <p className="lead" data-fade>Six steps, one person to talk to, and a live link from the first week.</p>
      </header>
      <div className="wrap">
        {steps.map((s) => (
          <section className="story" key={s.n}>
            <div><span className="cap soft">{s.w}</span><h2 style={{ marginTop: 10 }}>{s.n} {s.t}</h2></div>
            <div><p>{s.p}</p></div>
          </section>
        ))}
      </div>
      <section className="s wrap principles" aria-labelledby="pp">
        <h2 id="pp"><Split fill text="Talk to the maker. See it live. Keep everything." /></h2>
        <Principles />
        <p className="soft" style={{ marginTop: 36 }}>Ready? <TransitionLink href="/contact">Start a project</TransitionLink> or browse the <TransitionLink href="/services">services</TransitionLink>.</p>
      </section>
      <Close />
    </>
  );
}
