"use client";
import { films } from "@/content/work";

/** Vertical reels: play on hover (desktop) or tap (touch), muted, with a text label for each. */
export default function FilmsGrid() {
  const play = (e: React.SyntheticEvent<HTMLElement>) => e.currentTarget.querySelector("video")?.play().catch(() => {});
  const stop = (e: React.SyntheticEvent<HTMLElement>) => e.currentTarget.querySelector("video")?.pause();
  return (
    <div className="reels">
      {films.map((f) => (
        <figure className="reel-t" key={f.src} style={{ margin: 0 }} onPointerEnter={play} onPointerLeave={stop} onClick={play}>
          <div className="clip">
            <video src={f.src} poster={f.poster} muted loop playsInline preload="none" aria-label={`${f.brand}: ${f.alt}`} />
          </div>
          <figcaption style={{ display: "grid", gap: 4 }}><b>{f.brand}</b><span>{f.label}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}
