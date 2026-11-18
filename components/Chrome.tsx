"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";

/** Scroll progress bar, floating WhatsApp (mobile), services hover preview, live Gurgaon clock. */
export default function Chrome() {
  const pathname = usePathname();
  const prog = useRef<HTMLSpanElement>(null);
  const fab = useRef<HTMLAnchorElement>(null);
  const pv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
      if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      fab.current?.classList.toggle("show", y > innerHeight * 0.8 && !pathname.startsWith("/contact"));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => document.querySelectorAll("[data-clock]").forEach((el) => { el.textContent = fmt.format(new Date()); });
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [pathname]);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0;
    const loop = () => { px += (tx - px) * 0.16; py += (ty - py) * 0.16; if (pv.current) { pv.current.style.left = px + "px"; pv.current.style.top = py + "px"; } raf = requestAnimationFrame(loop); };
    const over = (e: PointerEvent) => {
      const row = (e.target as HTMLElement).closest<HTMLElement>(".svc-row");
      if (row?.dataset.img && pv.current) { pv.current.style.backgroundImage = `url(${row.dataset.img})`; pv.current.classList.add("on"); if (!raf) loop(); }
      else if (!row) pv.current?.classList.remove("on");
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tilted: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      tx = e.clientX + 180; ty = e.clientY;
      if (reduce) return;
      // work cards tilt a few degrees towards the cursor
      const card = (e.target as HTMLElement).closest<HTMLElement>(".card");
      if (tilted && tilted !== card) { tilted.style.removeProperty("--rx"); tilted.style.removeProperty("--ry"); tilted = null; }
      if (card) {
        const r = card.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", `${(nx * 6).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${(-ny * 5).toFixed(2)}deg`);
        tilted = card;
      }
    };
    document.addEventListener("pointerover", over);
    document.addEventListener("pointermove", move);
    return () => { document.removeEventListener("pointerover", over); document.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true"><span ref={prog} /></div>
      <a ref={fab} className="fab" href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Orvyn on WhatsApp"><span aria-hidden="true">✳</span> WhatsApp</a>
      <div ref={pv} className="preview" aria-hidden="true" />
    </>
  );
}
