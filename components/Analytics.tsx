"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TransitionLink from "./TransitionLink";

// Only a well-formed GA4 ID is ever written into the inline script.
const RAW_GA = process.env.NEXT_PUBLIC_GA_ID || "";
const GA_ID = /^G-[A-Z0-9]{4,20}$/.test(RAW_GA) ? RAW_GA : "";
const KEY = "orvyn-consent";
type Gtag = (...args: unknown[]) => void;
const gtag: Gtag = (...args) => { (window as unknown as { dataLayer: unknown[] }).dataLayer?.push(args); };

/**
 * Google Analytics 4 with Consent Mode v2: everything is denied by default, and
 * analytics_storage is granted only after the visitor taps "Allow". Page views are
 * sent on every client-side route change, so GA stays in sync with the App Router.
 */
export default function Analytics() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<"granted" | "denied" | null>("denied");

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(KEY); } catch {}
    setChoice(saved === "granted" || saved === "denied" ? saved : null);
  }, []);

  useEffect(() => {
    if (!GA_ID || choice !== "granted") return;
    gtag("event", "page_view", { page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [pathname, choice]);

  function decide(v: "granted" | "denied") {
    try { localStorage.setItem(KEY, v); } catch {}
    setChoice(v);
    if (GA_ID) gtag("consent", "update", { analytics_storage: v });
  }

  if (!GA_ID) return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
        try{ if(localStorage.getItem('${KEY}')==='granted'){ gtag('consent','update',{analytics_storage:'granted'}); } }catch(e){}
        gtag('js', new Date());
        gtag('config','${GA_ID}',{send_page_view:false, anonymize_ip:true});
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      {choice === null && (
        <div className="consent" role="region" aria-label="Cookie choice">
          <p>We use Google Analytics to see which pages help visitors. No ads, no selling data. Allow analytics cookies? <TransitionLink href="/privacy">Privacy policy</TransitionLink></p>
          <div className="row">
            <button className="pill solid" type="button" onClick={() => decide("granted")}>Allow</button>
            <button className="pill" type="button" onClick={() => decide("denied")}>No thanks</button>
          </div>
        </div>
      )}
    </>
  );
}

/** Fire a GA4 event (only sends if the visitor allowed analytics). */
export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && GA_ID) gtag("event", name, params);
}
