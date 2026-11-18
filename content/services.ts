export type Service = {
  slug: string;
  title: string;
  isNew?: boolean;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  img?: string;
  imgAlt?: string;
  related: string[]; // case slugs
  showFilms?: boolean;
  showSeoWork?: boolean;
  includes: [string, string][];
  faq: [string, string][];
};

export const services: Service[] = [
  {
    slug: "websites",
    title: "Websites",
    metaTitle: "Website Design and Development in Gurgaon",
    metaDescription: "Fast, story-led websites built in Next.js that load quickly on phones and turn visitors into enquiries. Design, build, SEO basics and launch.",
    lead: "Fast, story-led websites that load quickly on phones and turn visitors into enquiries.",
    img: "/work/doubleshot-site.jpg",
    imgAlt: "Doubleshot Coffee Roasters website built by Orvyn",
    related: ["nihal-healthcare", "doubleshot-coffee-roasters"],
    includes: [["Strategy and sitemap", "What each page must do"], ["Design", "A visual world made for your brand"], ["Build", "Next.js, animated, mobile first"], ["Launch", "Domain, analytics and SEO basics"]],
    faq: [["How long does a website take?", "Most sites take two to five weeks, depending on pages and content."], ["Do I own the site?", "Yes. The code, domain and content are yours."], ["Can you write the content?", "Yes, or we shape what you already have."]],
  },
  {
    slug: "seo",
    title: "SEO",
    isNew: true,
    metaTitle: "SEO Services in Gurgaon: Technical, Local and Content SEO",
    metaDescription: "Get found on Google and in AI answers: technical fixes, on-page and local SEO, Google Business Profile, schema and speed, reported every month.",
    lead: "Get found on Google and in AI answers: technical fixes, on-page and local SEO, schema and speed, reported every month.",
    img: "/seo/metro-locksmiths.jpg",
    imgAlt: "Metro Locksmith LLC website, an Orvyn SEO content project",
    related: [],
    showSeoWork: true,
    includes: [["Technical audit", "Speed, indexing, broken links, Core Web Vitals"], ["On-page SEO", "Titles, headings and content for the searches that matter"], ["Local SEO", "Google Business Profile and local citations"], ["Schema markup", "Rich results for products, FAQs and your business"], ["AI search visibility", "Content that AI assistants can find and cite"], ["Monthly report", "Rankings, traffic and next steps"]],
    faq: [["When will I see results?", "Technical fixes show within weeks; rankings usually build over three to six months."], ["Do you guarantee first position?", "No one honest can. We commit to the work and report what it moves."], ["Can you do SEO on a site you did not build?", "Yes. We start with an audit of what is there."]],
  },
  {
    slug: "films",
    title: "Films",
    metaTitle: "Hypermotion Reels, UGC and Product Films",
    metaDescription: "Short-form films for brands: hypermotion reels, creator-style UGC and cinematic product films made for the first three seconds of a scroll.",
    lead: "Hypermotion reels, creator-style UGC and cinematic product films that hold attention to the last frame.",
    img: "/work/coloressence-hypermotion-reel-2.jpg",
    imgAlt: "Coloressence festive hypermotion reel by Orvyn",
    related: [],
    showFilms: true,
    includes: [["Concept", "A hook built for the first three seconds"], ["Production", "AI-assisted visuals and real footage"], ["Edit", "Sound, pacing and captions"], ["Formats", "Reels, Shorts, ads and your website"]],
    faq: [["How long is a typical film?", "10 to 30 seconds, made for Reels and ads."], ["Do you need my product?", "Product photos are enough for most hypermotion work."]],
  },
  {
    slug: "ai-tools",
    title: "AI Tools",
    metaTitle: "Custom AI Tools and Products",
    metaDescription: "Working AI products built for your business: from sketch-to-website generation to natural-language search, prototyped in days.",
    lead: "Working AI products, from sketch-to-website generation to natural-language search.",
    img: "/work/sketch-to-ui-cover.webp",
    imgAlt: "Sketch to UI, an AI tool built by Orvyn",
    related: ["sketch-to-ui", "discover"],
    includes: [["Discovery", "Find the one task worth automating"], ["Prototype", "Something usable within days"], ["Build", "A production app on your data"], ["Handover", "Docs and support"]],
    faq: [["Which AI models do you use?", "Whichever fits the job and the budget; we explain the trade-offs."]],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    metaTitle: "AI Chatbots for Websites and WhatsApp",
    metaDescription: "AI chatbots that answer customer questions and capture leads on your website and WhatsApp, around the clock, with a human handoff.",
    lead: "Chatbots that answer customer questions and capture leads on your site and WhatsApp, around the clock.",
    related: [],
    includes: [["Training", "On your products, prices and FAQs"], ["Channels", "Website and WhatsApp"], ["Lead capture", "Name and number straight to you"], ["Handoff", "A person takes over when needed"]],
    faq: [["Is there a live example?", "A demo is available on request."]],
  },
  {
    slug: "crm-dashboards",
    title: "CRM Dashboards",
    metaTitle: "Custom CRM and Sales Dashboards",
    metaDescription: "Custom dashboards that turn sales and customer data into decisions you can act on each morning, with alerts and team access.",
    lead: "Custom dashboards that turn sales and customer data into decisions you can act on each morning.",
    related: [],
    includes: [["Data", "Sheets, CRM or database"], ["Dashboard", "The few numbers that matter"], ["Alerts", "When something needs attention"], ["Access", "For you and your team"]],
    faq: [["Is there a live example?", "A demo is available on request."]],
  },
];

export const serviceBySlug = (s: string) => services.find((x) => x.slug === s);
