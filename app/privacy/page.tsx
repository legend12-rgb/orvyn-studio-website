import Split from "@/components/Split";
import TransitionLink from "@/components/TransitionLink";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: "How Orvyn collects, uses and protects personal data from enquiries and analytics, in line with India's Digital Personal Data Protection Act, 2023.",
  path: "/privacy",
  kicker: "Privacy policy",
});

const UPDATED = "10 October 2026";

export default function Privacy() {
  return (
    <>
      <header className="phead wrap">
        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)" }}><Split text="Privacy policy" /></h1>
        <p className="lead" data-fade>Last updated {UPDATED}. Plain-language summary first, details below.</p>
      </header>
      <div className="wrap"><div className="article legal">
        <p><b>In short:</b> we collect only what you send us in the enquiry form, plus anonymous usage statistics if you allow analytics. We use it to reply to you and to improve the site. We never sell it.</p>

        <h2>Who we are</h2>
        <p>{site.name} is a creative studio based in {site.city}, India. For anything about your data, write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

        <h2>What we collect</h2>
        <ul>
          <li><b>Enquiry form:</b> your name, phone or WhatsApp number, email (optional), the services you are interested in, your budget band and your message.</li>
          <li><b>Spam protection:</b> Cloudflare Turnstile checks that the form is sent by a person. Cloudflare processes technical signals such as your IP address and browser details for this check only.</li>
          <li><b>Analytics, only if you allow it:</b> Google Analytics 4 records anonymous usage such as pages visited, device type and approximate location. It is off until you tap "Allow", and IP anonymisation is on.</li>
          <li><b>Server logs:</b> our host (Vercel) keeps short-lived technical logs for security and reliability.</li>
        </ul>

        <h2>Why we use it</h2>
        <ul>
          <li>To reply to your enquiry and discuss your project (your consent, given when you send the form).</li>
          <li>To keep the site secure and free of spam.</li>
          <li>To understand which pages help visitors, only if you allow analytics.</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>Only the service providers that run the site: Vercel (hosting), Cloudflare (spam protection), Resend (delivers your enquiry to our inbox) and Google (analytics, if allowed). They process data on our behalf. We do not sell or rent your data, and we do not use it for advertising.</p>

        <h2>How long we keep it</h2>
        <p>Enquiries are kept for as long as we are discussing or working on your project, and for up to 24 months afterwards unless you ask us to delete them sooner. Analytics data is kept for 14 months.</p>

        <h2>Your rights</h2>
        <p>Under India's Digital Personal Data Protection Act, 2023, you can ask to see the personal data we hold about you, correct it, have it deleted, or withdraw your consent. Write to <a href={`mailto:${site.email}`}>{site.email}</a> and we will respond within 30 days. You can also change your analytics choice at any time by clearing this site's storage in your browser; the choice banner will appear again.</p>

        <h2>Cookies</h2>
        <p>The site itself works without cookies. Google Analytics sets cookies only after you allow it. Cloudflare Turnstile may use a short-lived token on the contact page to block spam.</p>

        <h2>Children</h2>
        <p>This site is meant for businesses and is not directed at children under 18.</p>

        <h2>Changes</h2>
        <p>If we change this policy, we will update the date at the top of this page.</p>

        <p className="soft">Questions? <TransitionLink href="/contact">Contact us</TransitionLink>.</p>
      </div></div>
    </>
  );
}
