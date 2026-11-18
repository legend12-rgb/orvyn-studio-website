export const site = {
  name: "Orvyn Solutions",
  short: "Orvyn",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://orvynsolutions.vercel.app").replace(/\/$/, ""),
  tagline: "Websites, SEO, films and AI tools for brands that want to be found and remembered.",
  description:
    "Orvyn is a creative studio in Gurgaon building fast websites, SEO, short-form films and AI tools for brands across India.",
  email: "orvynsols@gmail.com",
  phone: "+91 93551 70131",
  phoneHref: "tel:+919355170131",
  whatsapp: "https://wa.me/919355170131",
  city: "Gurgaon",
  region: "Haryana",
  country: "IN",
};

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/studio", label: "Studio" },
  { href: "/journal", label: "Journal" },
];

export const principles = [
  ["Talk to the maker", "No account managers. The person you message is the person building it."],
  ["See it live", "A working link from the first week, not slides and promises."],
  ["Keep everything", "Code, domain, files and logins are yours from day one."],
] as const;

export const steps = [
  { n: "01", t: "Call", p: "A 20-minute chat about the goal, the audience and the deadline.", w: "Day 1" },
  { n: "02", t: "Plan", p: "Scope, timeline and price in writing before any work starts.", w: "Days 2 to 3" },
  { n: "03", t: "Design", p: "A visual direction you approve before anything is built.", w: "Week 1" },
  { n: "04", t: "Build", p: "Progress on a live link you can open on your phone every week.", w: "Weeks 2 to 4" },
  { n: "05", t: "Launch", p: "Domain, speed, SEO and analytics checked before going live.", w: "Launch week" },
  { n: "06", t: "Grow", p: "Monthly reports and improvements if you want us to stay on.", w: "After launch" },
];

export const faqHome = [
  ["How much does a project cost?", "It depends on scope. Share a budget band in the enquiry form and we will tell you honestly what it can cover."],
  ["How fast can you start?", "Usually within a week of agreeing the plan."],
  ["Do you only work with Gurgaon businesses?", "No. We are based in Gurgaon and work with brands across India and abroad, mostly over WhatsApp and video calls."],
  ["Can you take over an existing website?", "Yes. We start with an audit and fix what matters first."],
  ["What do I need to get started?", "A short note on what you sell, who buys it, and any examples you like."],
  ["Do I own the website and the code?", "Yes. The code, domain, content and logins are yours from day one."],
] as const;
