"use client";
import Script from "next/script";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import TransitionLink from "./TransitionLink";
import { track } from "./Analytics";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";

const NEEDS = ["Website", "SEO", "Film", "AI tool", "Chatbot", "Dashboard"];
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ContactForm() {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, { ok: null });
  const [needs, setNeeds] = useState<string[]>([]);
  const errors = state.ok === false ? state.errors : {};
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.ok !== "whatsapp") return;
    window.open(`${site.whatsapp}?text=${encodeURIComponent(state.text)}`, "_blank", "noopener");
    router.push(`/contact/thank-you?ref=${state.ref}`);
  }, [state, router]);

  useEffect(() => {
    if (state.ok !== false) return;
    const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
    first?.focus();
    // a fresh token is needed after a failed submit
    (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
  }, [state]);

  const err = (k: keyof typeof errors) => errors[k];
  return (
    <form ref={formRef} action={action} noValidate onSubmit={() => track("generate_lead", { method: "contact_form" })} className={pending ? "pending" : ""}>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="lbl">What do you need?</legend>
        <div className="chips">
          {NEEDS.map((n) => {
            const on = needs.includes(n);
            return (
              <button key={n} type="button" aria-pressed={on} onClick={() => setNeeds(on ? needs.filter((x) => x !== n) : [...needs, n])}>{n}</button>
            );
          })}
        </div>
        {needs.map((n) => <input key={n} type="hidden" name="needs" value={n} />)}
      </fieldset>

      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby={err("name") ? "e-name" : undefined} />
        {err("name") && <small className="err" id="e-name">{err("name")}</small>}
      </div>
      <div className="field">
        <label htmlFor="f-phone">Phone or WhatsApp</label>
        <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!err("phone")} aria-describedby={err("phone") ? "e-phone" : undefined} />
        {err("phone") && <small className="err" id="e-phone">{err("phone")}</small>}
      </div>
      <div className="field">
        <label htmlFor="f-email">Email <span className="soft">(optional)</span></label>
        <input id="f-email" name="email" type="email" autoComplete="email" aria-invalid={!!err("email")} aria-describedby={err("email") ? "e-email" : undefined} />
        {err("email") && <small className="err" id="e-email">{err("email")}</small>}
      </div>
      <div className="field">
        <label htmlFor="f-budget">Budget</label>
        <select id="f-budget" name="budget" defaultValue="Not sure yet">
          <option>Not sure yet</option><option>Under ₹50,000</option><option>₹50,000 to ₹1.5 lakh</option><option>Above ₹1.5 lakh</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-msg">About the project</label>
        <textarea id="f-msg" name="message" maxLength={2000} aria-invalid={!!err("message")} placeholder="What do you sell, and what should the project achieve?" />
        {err("message") && <small className="err">{err("message")}</small>}
      </div>

      {/* honeypot: hidden from people and screen readers */}
      <div className="visually-hidden" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" data-size="flexible" />
        {err("captcha") && <small className="err" role="alert">{err("captcha")}</small>}
      </div>

      <button className="pill solid" type="submit" disabled={pending} style={{ justifySelf: "start" }}>
        {pending ? "Sending…" : <>Send enquiry <span className="arr">→</span></>}
      </button>
      {err("form") && <p className="err" role="alert">{err("form")}</p>}
      <p className="soft" style={{ fontSize: ".88rem" }}>
        We only use these details to reply to you. See the <TransitionLink href="/privacy">privacy policy</TransitionLink>.
      </p>
    </form>
  );
}
