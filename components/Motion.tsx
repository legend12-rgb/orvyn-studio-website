"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Wraps each word and letter in spans for the rise animation; the parent keeps the readable label. */
function split(el: HTMLElement) {
  // Pages render their spans with components/Split.tsx; never rewrite React-owned DOM.
  if (el.dataset.done || el.querySelector(".ch")) return;
  el.dataset.done = "1";
  const text = el.textContent || "";
  el.setAttribute("aria-label", text);
  const frag = document.createDocumentFragment();
  text.split(" ").forEach((word, i) => {
    if (i) frag.append(" ");
    const w = document.createElement("span");
    w.className = "w";
    w.setAttribute("aria-hidden", "true");
    for (const c of word) {
      const ch = document.createElement("span");
      ch.className = "ch";
      ch.textContent = c;
      w.append(ch);
    }
    frag.append(w);
  });
  el.replaceChildren(frag);
}

/** All scroll and entrance motion, re-run on every route. Reduced motion: nothing moves. */
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const main = document.getElementById("content");
    if (!main) return;
    document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => v.play().catch(() => {}));
    if (reduce) return;
    const E = "expo.out";
    const ctx = gsap.context(() => {
      main.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        split(el);
        gsap.from(el.querySelectorAll(".ch"), { yPercent: 110, duration: 1, ease: E, stagger: 0.03, delay: 0.25 });
      });
      main.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => gsap.from(el, { y: 24, opacity: 0, duration: 0.9, ease: E, delay: 0.45 }));
      main.querySelectorAll<HTMLElement>("[data-split-lines]").forEach((el) => {
        split(el);
        gsap.from(el.querySelectorAll(".ch"), { yPercent: 110, duration: 0.9, ease: E, stagger: 0.018, scrollTrigger: { trigger: el, start: "top 88%" } });
      });
      main.querySelectorAll<HTMLElement>(".clip").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(14% 8% 14% 8% round 18px)" }, { clipPath: "inset(0% 0% 0% 0% round 18px)", duration: 1.2, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 90%" } });
        const im = el.querySelector(".im");
        if (im) gsap.fromTo(im, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
      main.querySelectorAll<HTMLElement>(".step,.facts > div,.pgrid > div,details,.reel-t").forEach((el) =>
        gsap.from(el, { y: 30, opacity: 0, duration: 0.8, ease: E, scrollTrigger: { trigger: el, start: "top 92%" } })
      );

      // service rows: the rule draws itself left to right, then the row settles in
      main.querySelectorAll<HTMLElement>(".svc-row").forEach((el, i) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%" } });
        tl.fromTo(el, { "--rule": 0 }, { "--rule": 1, duration: 1.1, ease: "power3.inOut", delay: (i % 6) * 0.06 })
          .from(el.children, { y: 26, opacity: 0, duration: 0.8, ease: E, stagger: 0.06 }, "<.15");
      });

      // scroll-linked word fill: each word lights up as the reader passes it
      main.querySelectorAll<HTMLElement>("[data-fill]").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".w"), { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 42%", scrub: 0.6 } });
      });

      // case study hero: a slow zoom-out as you scroll in
      const caseHero = main.querySelector<HTMLElement>(".case-hero .im");
      if (caseHero) gsap.fromTo(caseHero, { scale: 1.16 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".case-hero", start: "top 85%", end: "bottom top", scrub: true } });

      // images lean with scroll speed and settle back when scrolling stops
      const leaners = gsap.utils.toArray<HTMLElement>(".card .clip, .jcard .clip, .gallery .clip, .reel-t .clip");
      if (leaners.length) {
        const setters = leaners.map((l) => gsap.quickTo(l, "skewY", { duration: 0.6, ease: "power3.out" }));
        const rest = () => setters.forEach((q) => q(0));
        let idle: ReturnType<typeof setTimeout> | undefined;
        ScrollTrigger.create({
          trigger: main, start: "top top", end: "bottom bottom",
          onUpdate: (self) => {
            const s = gsap.utils.clamp(-3, 3, self.getVelocity() / -260);
            setters.forEach((q) => q(s));
            clearTimeout(idle);
            idle = setTimeout(rest, 140);
          },
          onLeave: rest, onLeaveBack: rest,
        });
      }

      if (pathname === "/") {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", () => {
          gsap.fromTo("[data-reel]", { scale: 0.36, borderRadius: "999px" }, { scale: 1, borderRadius: "0px", ease: "none", scrollTrigger: { trigger: ".reel-sec", start: "top top", end: "bottom bottom", scrub: true } });
          gsap.fromTo("[data-reel-label]", { opacity: 1 }, { opacity: 0, ease: "none", scrollTrigger: { trigger: ".reel-sec", start: "top top", end: "40% top", scrub: true } });
          const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-stmt]", start: "top top", end: "bottom bottom", scrub: true } });
          tl.to("[data-stmt-text]", { scale: 0.42, opacity: 0.9, ease: "none" }).to("[data-stmt-cap]", { opacity: 1, ease: "none" }, "<.4");
          const cards = gsap.utils.toArray<HTMLElement>(".scard");
          cards.forEach((c, i) => {
            if (i === cards.length - 1) return;
            gsap.to(c, { scale: 0.94, opacity: 0.6, ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 90px", scrub: true } });
          });
          const track = document.querySelector<HTMLElement>("[data-proc-track]");
          if (track) {
            const dist = () => track.scrollWidth - innerWidth + 40;
            gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: "[data-proc]", start: "top 72px", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, refreshPriority: 1 } });
          }

          // hero: a soft light follows the cursor ("the paint catches the light"), petals and wordmark sit at different depths
          const hero = document.querySelector<HTMLElement>(".hero");
          const wm = hero?.querySelector<HTMLElement>(".wm");
          if (hero && wm && matchMedia("(pointer: fine)").matches) {
            const petals = gsap.utils.toArray<HTMLElement>(".hero .petal");
            const px = petals.map((p) => gsap.quickTo(p, "--px", { duration: 1.2, ease: "power3.out" }));
            const py = petals.map((p) => gsap.quickTo(p, "--py", { duration: 1.2, ease: "power3.out" }));
            const wx = gsap.quickTo(wm, "x", { duration: 1.4, ease: "power3.out" });
            const wy = gsap.quickTo(wm, "y", { duration: 1.4, ease: "power3.out" });
            const lx = gsap.quickTo(hero, "--mx", { duration: 0.9, ease: "power3.out" });
            const ly = gsap.quickTo(hero, "--my", { duration: 0.9, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = hero.getBoundingClientRect();
              const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
              lx((nx + 0.5) * 100); ly((ny + 0.5) * 100);
              petals.forEach((_, i) => { const depth = 22 + i * 16; px[i](-nx * depth); py[i](-ny * depth); });
              wx(nx * 12); wy(ny * 7);
            };
            hero.addEventListener("pointermove", move);
            return () => hero.removeEventListener("pointermove", move);
          }
        });

        // petals float up and away as the hero scrolls out (all screen sizes)
        gsap.utils.toArray<HTMLElement>(".hero .petal").forEach((p, i) => {
          gsap.to(p, { "--sy": -160 - i * 90, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        });
        const n = document.querySelector<HTMLElement>("[data-count]");
        if (n) {
          const target = Number(n.dataset.count), o = { v: 0 };
          gsap.to(o, { v: target, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: n, start: "top 85%" }, onUpdate: () => { n.textContent = String(Math.round(o.v)).padStart(2, "0"); } });
        }
        gsap.fromTo("[data-curve]", { attr: { startOffset: 40 } }, { attr: { startOffset: -480 }, ease: "none", scrollTrigger: { trigger: ".curve", start: "top bottom", end: "bottom top", scrub: true } });
      }
    }, main);

    const giant = document.querySelector<HTMLElement>("[data-giant]");
    let giantTween: gsap.core.Tween | undefined;
    if (giant) {
      split(giant);
      giantTween = gsap.fromTo(giant.querySelectorAll(".ch"), { yPercent: 100 }, { yPercent: 0, duration: 1.2, ease: E, stagger: 0.06, scrollTrigger: { trigger: ".giant", start: "top 95%", toggleActions: "play none none reset" } });
    }
    // triggers below the pinned section must be measured after its pin-spacer exists: sort by page order, then refresh
    requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
    return () => { ctx.revert(); giantTween?.scrollTrigger?.kill(); giantTween?.kill(); };
  }, [pathname]);
  return null;
}
