import type { Metadata } from "next";
import TransitionLink from "@/components/TransitionLink";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="wrap e404">
      <h1>404</h1>
      <p style={{ font: "400 1.6rem/1.3 var(--disp)" }}>This page wandered off.</p>
      <p className="soft" style={{ maxWidth: "44ch" }}>The link may be old or mistyped. Try one of these instead:</p>
      <div className="links">
        <TransitionLink className="pill solid" href="/work">See the work</TransitionLink>
        <TransitionLink className="pill" href="/services">Services</TransitionLink>
        <TransitionLink className="pill" href="/contact">Contact</TransitionLink>
        <TransitionLink className="pill" href="/">Home</TransitionLink>
      </div>
    </section>
  );
}
