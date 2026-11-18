"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import TransitionLink from "./TransitionLink";
import { nav, site } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(pathname === "/");
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) { setOverHero(false); return; }
    const io = new IntersectionObserver(([e]) => setOverHero(e.isIntersecting), { rootMargin: "-70px 0px -100% 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) { lenis?.stop(); closeBtn.current?.focus(); } else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <>
      <nav className="nav" aria-label="Main" style={{ ["--navbg" as string]: overHero ? "transparent" : "var(--cream)" }}>
        <div className="side l">
          {nav.map((n) => (
            <TransitionLink key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}>{n.label}</TransitionLink>
          ))}
        </div>
        <TransitionLink className="logo" href="/" aria-label="Orvyn Solutions, home"><span className="dev" aria-hidden="true">ओ</span>Orvyn</TransitionLink>
        <div className="side r">
          <a className="hide-sm" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <TransitionLink className="pill solid hide-sm" href="/contact">Start a project</TransitionLink>
          <button className="menu-btn" type="button" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(true)}>Menu</button>
        </div>
      </nav>
      <div className={`menu${open ? " open" : ""}`} id="menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <button ref={closeBtn} className="menu-btn close-m" type="button" style={{ display: "inline-block" }} onClick={() => setOpen(false)}>Close</button>
        {[...nav, { href: "/films", label: "Films" }, { href: "/contact", label: "Contact" }].map((n) => (
          <TransitionLink key={n.href} href={n.href} tabIndex={open ? 0 : -1}>{n.label}</TransitionLink>
        ))}
        <div className="meta">{site.email}<br />{site.phone.replace(/ /g, " ")}</div>
      </div>
    </>
  );
}
