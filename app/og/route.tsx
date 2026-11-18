import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

/** Branded 1200x630 preview image for every page: /og?title=...&kicker=... */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Orvyn Solutions").slice(0, 90);
  const kicker = (searchParams.get("kicker") || "Creative studio, Gurgaon").slice(0, 60);
  const [disp, body] = await Promise.all([
    readFile(path.join(process.cwd(), "fonts/og/Gambarino-400.ttf")).catch(() => null),
    readFile(path.join(process.cwd(), "fonts/og/Satoshi-500.ttf")).catch(() => null),
  ]);
  const fonts = [
    ...(disp ? [{ name: "Gambarino", data: disp, weight: 400 as const, style: "normal" as const }] : []),
    ...(body ? [{ name: "Satoshi", data: body, weight: 500 as const, style: "normal" as const }] : []),
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#E8B208", color: "#2B2620", padding: "64px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Satoshi", fontSize: 26, letterSpacing: 3, textTransform: "uppercase" }}>
          <span>{kicker}</span><span>orvyn</span>
        </div>
        <div style={{ display: "flex", fontFamily: "Gambarino", fontSize: title.length > 40 ? 76 : 104, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Satoshi", fontSize: 26 }}>
          <span>Websites · SEO · Films · AI tools</span><span>Orvyn Solutions</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts, headers: { "Cache-Control": "public, max-age=86400, immutable" } }
  );
}
