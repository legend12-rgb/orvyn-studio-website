import Split from "@/components/Split";
import type { Metadata } from "next";
import TransitionLink from "@/components/TransitionLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your enquiry reached Orvyn. We reply within a working day.",
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ ref?: string }> };

export default async function ThankYou({ searchParams }: Props) {
  const raw = (await searchParams).ref || "";
  const ref = /^OR-[A-Z0-9]{6}$/.test(raw) ? raw : "";
  const wa = `${site.whatsapp}?text=${encodeURIComponent(ref ? `Hi Orvyn, I just sent enquiry ${ref}.` : "Hi Orvyn, I just sent an enquiry.")}`;
  return (
    <section className="wrap thanks">
      <span className="cap soft">Enquiry sent{ref && <> · ref {ref}</>}</span>
      <h1><Split text="Thank you" /></h1>
      <p className="lead" style={{ fontSize: "1.2rem", maxWidth: "52ch", color: "var(--ink-soft)" }}>
        We have your details and will reply within a working day, usually on WhatsApp. If it is urgent, message us now and mention your reference.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a className="pill solid" href={wa} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        <TransitionLink className="pill" href="/work">See the work</TransitionLink>
      </div>
      <p className="soft">While you wait: <TransitionLink href="/process">how a project runs</TransitionLink>, or read the <TransitionLink href="/journal">journal</TransitionLink>.</p>
    </section>
  );
}
