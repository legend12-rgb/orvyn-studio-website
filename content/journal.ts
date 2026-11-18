export type Note = { slug: string; title: string; description: string; kind: string; img: string; imgAlt: string; date: string; body: { h?: string; p?: string; ol?: string[] }[] };

export const notes: Note[] = [
  {
    slug: "first-10-seconds",
    title: "What your website must do in the first 10 seconds",
    description: "Most visitors decide whether to stay before they scroll. The three jobs a website has in its first seconds, and how motion can help or hurt.",
    kind: "Websites",
    img: "/work/doubleshot-site-craft.jpg",
    imgAlt: "Doubleshot website section with a branded takeaway cup",
    date: "2026-10-10",
    body: [
      { p: "Most visitors decide whether to stay before they scroll. In those first seconds a site has three jobs." },
      { ol: ["Say what you do in plain words. Not a slogan; a sentence a stranger understands.", "Show proof straight away. Real work, real products, real places.", "Offer one clear next step. One button, the same label everywhere."] },
      { h: "Then, earn the scroll" },
      { p: "Motion helps when it tells the story in order, as on the Doubleshot site, where scrolling follows the coffee from farm to cup. It hurts when it only delays the content." },
    ],
  },
  {
    slug: "local-seo-gurgaon",
    title: "A local SEO checklist for Gurgaon businesses",
    description: "Six steps to show up in Google's map results and local searches: Business Profile, consistent details, reviews, service pages, schema and speed.",
    kind: "SEO",
    img: "/seo/metro-locksmiths.jpg",
    imgAlt: "A local service business website optimised for local search",
    date: "2026-10-10",
    body: [
      { p: "For a local business, the map results often matter more than the blue links. Start here." },
      { ol: ["Claim and complete your Google Business Profile, with categories, hours, photos and services.", "Use the same name, address and phone number everywhere online.", "Ask happy customers for reviews, and reply to every one.", "Give each service its own page with a clear title, such as \"Website design in Gurgaon\".", "Add LocalBusiness schema so search engines read your details correctly.", "Make the site fast on a phone. Speed is part of ranking."] },
    ],
  },
  {
    slug: "first-three-seconds",
    title: "Why hypermotion reels win the first three seconds",
    description: "On Reels a product has about three seconds to stop the thumb. How hypermotion makes the product itself the hook, and four rules that make it work.",
    kind: "Films",
    img: "/work/coloressence-hypermotion-reel-1.jpg",
    imgAlt: "Coloressence eye pencil hypermotion reel frame",
    date: "2026-10-10",
    body: [
      { p: "On Reels, the product has about three seconds to stop the thumb. Hypermotion makes the product itself the hook: one object, one bold move, no slow intro." },
      { h: "What makes it work" },
      { ol: ["Open on motion, not a logo.", "Keep the product centred and large.", "Let the light and the camera move, not the text.", "End on the product, ready for a caption or a call to action."] },
    ],
  },
];

export const noteBySlug = (s: string) => notes.find((n) => n.slug === s);
