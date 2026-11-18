"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export type EnquiryState = { ok: false; errors: Partial<Record<"name" | "phone" | "email" | "message" | "captcha" | "form", string>> } | { ok: null } | { ok: "whatsapp"; ref: string; text: string };

const NEEDS = ["Website", "SEO", "Film", "AI tool", "Chatbot", "Dashboard"] as const;
const BUDGETS = ["Not sure yet", "Under ₹50,000", "₹50,000 to ₹1.5 lakh", "Above ₹1.5 lakh"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Add your name so we know who to reply to.").max(80, "Keep your name under 80 characters."),
  phone: z.string().trim().max(20, "That number looks too long.").refine((v) => (v.match(/\d/g) || []).length >= 10, "Add a number with at least 10 digits, for example +91 98102 46713."),
  email: z.union([z.literal(""), z.string().trim().email("That email address doesn't look right.").max(120)]),
  needs: z.array(z.enum(NEEDS)).max(6),
  budget: z.enum(BUDGETS),
  message: z.string().trim().max(2000, "Keep the message under 2,000 characters."),
});

// Simple per-instance rate limit (5 enquiries per 10 minutes per IP). Turnstile is the main gate.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < win);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body, cache: "no-store" });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function submitEnquiry(_prev: EnquiryState, form: FormData): Promise<EnquiryState> {
  // honeypot: real people never fill this hidden field
  if ((form.get("company") as string)?.length) redirect("/contact/thank-you");

  const h = await headers();
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return { ok: false, errors: { form: "Too many enquiries from this connection. Please message us on WhatsApp instead." } };

  const parsed = schema.safeParse({
    name: form.get("name") ?? "",
    phone: form.get("phone") ?? "",
    email: form.get("email") ?? "",
    needs: form.getAll("needs"),
    budget: form.get("budget") ?? "Not sure yet",
    message: form.get("message") ?? "",
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
    return { ok: false, errors };
  }

  const ok = await verifyTurnstile(String(form.get("cf-turnstile-response") || ""), ip);
  if (!ok) return { ok: false, errors: { captcha: "Please complete the spam check and send again." } };

  const d = parsed.data;
  const ref = "OR-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const lines = [`Ref: ${ref}`, `Name: ${d.name}`, `Phone: ${d.phone}`, `Email: ${d.email || "-"}`, `Needs: ${d.needs.join(", ") || "-"}`, `Budget: ${d.budget}`, "", d.message || "-"];

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || "Orvyn Website <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO || "orvynsols@gmail.com"],
        reply_to: d.email || undefined,
        subject: `New enquiry ${ref}: ${d.name} (${d.needs.join(", ") || "general"})`,
        text: lines.join("\n"),
        html: `<pre style="font-family:system-ui;font-size:15px">${esc(lines.join("\n"))}</pre>`,
      }),
    });
    if (!res.ok) return { ok: false, errors: { form: "We couldn't send that just now. Please message us on WhatsApp and we'll pick it up." } };
  } else {
    // No email service configured yet: hand the enquiry to WhatsApp so no lead is lost.
    return { ok: "whatsapp", ref, text: [`Hi Orvyn, new enquiry ${ref}`, ...lines.slice(1)].join("\n") };
  }

  redirect(`/contact/thank-you?ref=${ref}`);
}
