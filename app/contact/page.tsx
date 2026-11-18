import Split from "@/components/Split";
import ContactForm from "@/components/ContactForm";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact: Start a Project",
  description: "Tell Orvyn what you are making. Message on WhatsApp, email, or send the enquiry form; we reply within a working day.",
  path: "/contact",
  kicker: "Start a project",
});

export default function ContactPage() {
  const phone = site.phone.replace(/ /g, " ");
  return (
    <>
      <header className="phead wrap">
        <h1><Split text="Start a project" /></h1>
        <p className="lead" data-fade>Tell us what you are making. We reply within a working day, usually on WhatsApp.</p>
      </header>
      <section className="wrap contact-grid" aria-label="Contact options">
        <div className="direct">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"><span className="cap soft">Fastest</span><b>WhatsApp</b><span>{phone}</span></a>
          <a href={`mailto:${site.email}`}><span className="cap soft">Email</span><b>{site.email}</b></a>
          <div><span className="cap soft">Studio</span><b>{site.city}</b><span><span data-clock>--:--</span> IST right now</span></div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
