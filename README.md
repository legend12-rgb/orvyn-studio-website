# Orvyn Solutions: studio website

The website for Orvyn Solutions, a small studio that builds websites, live dashboards, AI tools and short brand films for growing businesses. Its one job is to turn a visiting business owner into a project conversation on WhatsApp, a call or an enquiry form.

Live site: https://orvynwebsite.vercel.app

## What is on the site

- **Work and case studies** that show real projects first, each told as challenge, approach, what was built and result
- **Services** pages for websites, SEO, films, AI tools, chatbots and CRM dashboards
- **Films** grid for short brand and ad films
- **Contact** form with spam protection, a WhatsApp shortcut and an email fallback
- **Journal** for short written pieces
- Built mobile first, since most visitors arrive from a phone

## Built with

- Next.js (App Router) and React
- TypeScript
- GSAP and Lenis for scroll and motion
- Cloudflare Turnstile for form spam protection
- Resend for delivering enquiries to an inbox

## Run it locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open http://localhost:3000. Every value in `.env.example` is optional for local work: without an email key, enquiries are only logged on the server.

## Notes

- Film files are not included in this repository, so the Films section shows empty slots when you run it locally.
- No secrets are stored here. Keys go in `.env.local`, which is ignored by git.

## Contact

Shivam Dawar: shivamdawar0031@gmail.com
