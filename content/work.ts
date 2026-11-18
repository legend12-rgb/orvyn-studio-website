export type Case = {
  slug: string;
  kind: "Website" | "AI tool";
  title: string;
  tags: string[];
  sum: string;
  hero: string;
  heroAlt: string;
  meta: [string, string][];
  url: string;
  urlLabel: string;
  story: [string, string[]][];
  gallery: { src: string; alt: string }[];
  next: string;
};

export const cases: Case[] = [
  {
    slug: "nihal-healthcare",
    kind: "Website",
    title: "Nihal Healthcare",
    tags: ["Website", "Healthcare"],
    sum: "A corporate site for a sterile medical device manufacturer: three product categories and 23+ variants, each with its own specification page.",
    hero: "/work/nihal-site.jpg",
    heroAlt: "Nihal Healthcare website home page with the headline Precision Engineered Syringe Solutions for Modern Healthcare",
    meta: [["Client", "Nihal Healthcare"], ["Services", "Website design and build"], ["Built with", "Tailwind, GSAP"]],
    url: "https://nihalhealthcare.com/",
    urlLabel: "nihalhealthcare.com",
    story: [
      ["The challenge", ["Buyers judge a supplier on proof: certifications, sterilisation method, and the exact variant they need. The catalogue had to be easy to browse and credible enough to request a quote."]],
      ["What we built", ["The catalogue leads: syringes with needles, syringes without, and needles, with every variant organised by size and specification.", "Certifications, leadership, history and feedback each get their own page, and WhatsApp is one tap away on every product."]],
      ["The result", ["A live, mobile-ready catalogue of 23+ variant pages with a direct enquiry route on each."]],
    ],
    gallery: [
      { src: "/work/nihal-site-products.jpg", alt: "Nihal Healthcare product category page listing sterile hypodermic syringes" },
      { src: "/work/nihal-site-variants.jpg", alt: "Nihal Healthcare variant page with syringe sizes and specifications" },
      { src: "/work/nihal-site-certificates.jpg", alt: "Nihal Healthcare certifications page" },
    ],
    next: "doubleshot-coffee-roasters",
  },
  {
    slug: "doubleshot-coffee-roasters",
    kind: "Website",
    title: "Doubleshot Coffee Roasters",
    tags: ["Website", "Hospitality"],
    sum: "A one-page site for a Punjab roastery and eggless bakery: sourcing, roasting and brewing told as one scroll.",
    hero: "/work/doubleshot-site.jpg",
    heroAlt: "Doubleshot Coffee Roasters website hero with a roasted coffee bean on a dark background and the city names",
    meta: [["Client", "Doubleshot Coffee Roasters"], ["Services", "Website, brand film"], ["Built with", "GSAP, Lenis"]],
    url: "https://doubleshotcoffeeroasters.vercel.app/",
    urlLabel: "doubleshotcoffeeroasters.vercel.app",
    story: [
      ["The challenge", ["Doubleshot roasts its own coffee and bakes an entirely eggless menu across four cities, but that story only lived inside the cafe. Online it looked like any other delivery-app listing."]],
      ["What we built", ["One page, read in the order the coffee is made: sourcing, roasting, then brewing, each as a full-screen scene with a single line of copy.", "Menu prices, the bakery and the room get their own sections, and the page closes on locations, hours and the Zomato and Swiggy links."]],
      ["The result", ["A brand story told in one scroll, with ordering links where the appetite peaks, and a matching 10-second brand film."]],
    ],
    gallery: [
      { src: "/work/doubleshot-site-craft.jpg", alt: "Doubleshot website craft section with a branded takeaway cup" },
      { src: "/work/doubleshot-site-menu.jpg", alt: "Doubleshot website menu section with drinks and prices" },
      { src: "/work/doubleshot-site-room.jpg", alt: "Doubleshot website section showing the cafe interior" },
    ],
    next: "sketch-to-ui",
  },
  {
    slug: "sketch-to-ui",
    kind: "AI tool",
    title: "Sketch to UI",
    tags: ["AI tool", "Vision AI"],
    sum: "Draw a rough wireframe and get a working, responsive web page in under a minute, then refine it in plain English.",
    hero: "/work/sketch-to-ui-cover.webp",
    heroAlt: "Sketch to UI app with a hand-drawn wireframe on the left and the generated web page on the right",
    meta: [["Type", "AI product"], ["Built with", "Vision AI, code generation"]],
    url: "https://sketch-to-ui.vercel.app/",
    urlLabel: "sketch-to-ui.vercel.app",
    story: [
      ["The challenge", ["Turning a whiteboard idea into something testable usually takes a designer and a developer several days, so most early ideas never meet a real user."]],
      ["What we built", ["A browser sketch canvas. Vision AI reads boxes, buttons, inputs and images, then generates a complete interactive page in a live preview.", "Refine it in plain English (\"make it dark mode\"), compare versions, roll back, and test across screen sizes."]],
      ["The result", ["An idea goes from sketch to clickable page in under a minute."]],
    ],
    gallery: [
      { src: "/work/sketch-to-ui-generated.webp", alt: "Sketch to UI generated page preview" },
      { src: "/work/sketch-to-ui-refine.webp", alt: "Sketch to UI refining a page with a plain-English instruction" },
      { src: "/work/sketch-to-ui-code.webp", alt: "Sketch to UI showing the generated HTML code" },
    ],
    next: "discover",
  },
  {
    slug: "discover",
    kind: "AI tool",
    title: "Discover",
    tags: ["AI tool", "AI search"],
    sum: "A travel experiences marketplace where you describe what you want in your own words and AI turns it into precise search filters.",
    hero: "/work/discover-cover.webp",
    heroAlt: "Discover marketplace with a natural-language search box and matching travel experiences",
    meta: [["Type", "AI product"], ["Built with", "AI search, marketplace"]],
    url: "https://ai-experience-search.vercel.app/",
    urlLabel: "ai-experience-search.vercel.app",
    story: [
      ["The challenge", ["Filter-heavy search makes people translate what they want into dropdowns and checkboxes, and many leave before they find a match."]],
      ["What we built", ["Type \"a relaxing half-day thing in Bali under $80\" and the model turns it into structured filters, shown as removable chips.", "When nothing matches exactly, it shows the closest options instead of an empty page."]],
      ["The result", ["Search that understands intent, with no dead ends."]],
    ],
    gallery: [
      { src: "/work/discover-closest.webp", alt: "Discover showing the closest matches when nothing fits exactly" },
      { src: "/work/discover-availability.webp", alt: "Discover experience detail with availability" },
      { src: "/work/discover-cover.webp", alt: "Discover search results page" },
    ],
    next: "nihal-healthcare",
  },
];

export const films = [
  { src: "/films/coloressence-hypermotion-reel-1.mp4", poster: "/work/coloressence-hypermotion-reel-1.jpg", brand: "Coloressence", label: "Hypermotion, 12s", alt: "Coloressence eye pencil as a sculptural hero in black and chrome" },
  { src: "/films/coloressence-hypermotion-reel-2.mp4", poster: "/work/coloressence-hypermotion-reel-2.jpg", brand: "Coloressence", label: "Festive hypermotion, 12s", alt: "Coloressence eye pencil in a warm, candlelit festive scene" },
  { src: "/films/coloressence-ugc-reel.mp4", poster: "/work/coloressence-ugc-reel.jpg", brand: "Coloressence", label: "UGC reel, 15s", alt: "Creator-style video recommending a Coloressence product to camera" },
  { src: "/films/doubleshot-coffee-brand-film.mp4", poster: "/work/doubleshot-coffee-brand-film.jpg", brand: "Doubleshot", label: "Brand film, 10s", alt: "Coffee splashing from a branded Doubleshot cup in slow motion" },
  { src: "/films/demo-hypermotion-demo.mp4", poster: "/work/demo-hypermotion.jpg", brand: "Perfume", label: "Studio demo, 10s", alt: "A perfume bottle on still water in a candlelit stone hall" },
];

export const seoWork = [
  { title: "SocialiteSpaces", kind: "SEO content", sum: "Search-led articles for a lifestyle blog took traffic from about 100 to 1,025+ monthly views.", big: "10x", sub: "monthly views", url: "https://www.socialitespaces.com" },
  { title: "Metro Locksmiths LLC", kind: "Local SEO copy", sum: "Website and service-page content for a 24/7 mobile locksmith in Fairfax, Virginia.", img: "/seo/metro-locksmiths.jpg", alt: "Metro Locksmith LLC website hero: Locked out of your car in Fairfax, VA?", url: "https://www.metrolocksmithsllc.com" },
  { title: "Boon Doors", kind: "Press features", sum: "Features on a Jodhpur heritage-door maker, published in ThePrint and The Tribune.", img: "/seo/boon-doors-theprint.jpg", alt: "ThePrint article headline: Boon Doors is Redefining Design in Modern India Through Heritage Doors", url: "https://theprint.in/ani-press-releases/boon-doors-is-redefining-design-in-modern-india-through-heritage-doors/2631647/" },
  { title: "EZ Rental Living", kind: "SEO article", sum: "\"Tips for Airbnb Hosts\", a long-form article written to rank for hosting searches.", big: "Airbnb", sub: "hosting guide", url: "https://ezrentalliving.com/tips-for-airbnb-hosts/" },
  { title: "Sterling Tradings", kind: "Website content", sum: "Website content written for search and clarity.", big: "Sterling", sub: "website content", url: "https://www.sterlingtradings.com" },
  { title: "Humble Hope", kind: "Website content", sum: "Website content for a Canadian organisation.", big: "Humble Hope", sub: "website content", url: "https://www.humblehope.ca" },
] as { title: string; kind: string; sum: string; url: string; img?: string; alt?: string; big?: string; sub?: string }[];

export const caseBySlug = (s: string) => cases.find((c) => c.slug === s);
