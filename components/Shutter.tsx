"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TITLES: Record<string, string> = {
  "/": "Orvyn", "/work": "Work", "/services": "Services", "/process": "Process", "/films": "Films",
  "/studio": "Studio", "/journal": "Journal", "/contact": "Contact", "/privacy": "Privacy",
};
function titleFor(href: string) {
  const path = href.split("#")[0].split("?")[0] || "/";
  if (TITLES[path]) return TITLES[path];
  const last = path.split("/").filter(Boolean).pop() || "";
  return last.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

/** 2x5 mustard shutter: closes, navigates, then opens on the new page (exit faster than entrance). */
export default function Shutter() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const pending = useRef(false);
  const busy = useRef(false);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    async function cover(href: string) {
      const el = root.current!;
      setLabel(titleFor(href));
      el.classList.add("busy");
      if (reduce) { await el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, fill: "forwards" }).finished; return; }
      el.style.opacity = "1";
      const blocks = [...el.querySelectorAll<HTMLElement>(".b")];
      const anims = blocks.map((b, i) => {
        const col = i % 5, row = Math.floor(i / 5);
        b.style.transformOrigin = row ? "top" : "bottom";
        return b.animate([{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }], { duration: 540, delay: col * 45, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }).finished;
      });
      el.querySelector(".title")!.animate([{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "none" }], { duration: 380, delay: 330, easing: "cubic-bezier(.16,1,.3,1)", fill: "forwards" });
      await Promise.all(anims);
    }
    function onNav(e: Event) {
      const href = (e as CustomEvent<{ href: string }>).detail.href;
      if (busy.current) return;
      if (href.split("#")[0] === window.location.pathname) { router.push(href); return; }
      busy.current = true;
      cover(href).then(() => { pending.current = true; router.push(href); });
    }
    window.addEventListener("orvyn:navigate", onNav);
    return () => window.removeEventListener("orvyn:navigate", onNav);
  }, [router]);

  // the new route has rendered: open the shutter
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    const el = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo(0, 0);
    (window as unknown as { __lenis?: { scrollTo: (y: number, o: object) => void } }).__lenis?.scrollTo(0, { immediate: true });
    const done = () => { el.classList.remove("busy"); busy.current = false; document.getElementById("content")?.focus({ preventScroll: true }); };
    if (reduce) { el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" }).finished.then(done); return; }
    el.querySelector(".title")!.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: "forwards" });
    const blocks = [...el.querySelectorAll<HTMLElement>(".b")];
    Promise.all(blocks.map((b, i) => {
      const col = i % 5, row = Math.floor(i / 5);
      b.style.transformOrigin = row ? "bottom" : "top";
      return b.animate([{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }], { duration: 450, delay: 120 + (4 - col) * 40, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" }).finished;
    })).then(done);
  }, [pathname]);

  return (
    <div className="shutter" ref={root} aria-hidden="true">
      <div className="row">{[0, 1, 2, 3, 4].map((i) => <div className="b" key={i} />)}</div>
      <div className="row">{[0, 1, 2, 3, 4].map((i) => <div className="b" key={i} />)}</div>
      <div className="title"><i>✳</i><span>{label}</span></div>
    </div>
  );
}
