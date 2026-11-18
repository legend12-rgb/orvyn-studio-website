import Split from "@/components/Split";
import { Close, Faq, JsonLd, ServiceList, faqLd } from "@/components/blocks";
import { faqHome } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services: Websites, SEO, Films, AI Tools, Chatbots and Dashboards",
  description: "Six services from one Gurgaon studio: websites, SEO, short-form films, custom AI tools, AI chatbots and CRM dashboards, from first sketch to being found on Google.",
  path: "/services",
  kicker: "Services",
});

export default function ServicesPage() {
  return (
    <>
      <header className="phead wrap">
        <h1><Split text="Services" /><span className="count">(06)</span></h1>
        <p className="lead" data-fade>Six things we do well, from the first sketch to being found on Google.</p>
      </header>
      <div className="wrap"><ServiceList /></div>
      <section className="s wrap" aria-labelledby="sfaq">
        <div className="faq-grid"><div><h2 id="sfaq" style={{ fontSize: "var(--step-h2)", lineHeight: 0.95 }}>Questions</h2></div><Faq items={faqHome} /></div>
        <JsonLd data={faqLd(faqHome)} />
      </section>
      <Close />
    </>
  );
}
