"use client";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

/** Internal link that plays the shutter transition (components/Shutter.tsx) before navigating. */
export default function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  function handle(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (href.startsWith("#") || href.startsWith("http")) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("orvyn:navigate", { detail: { href } }));
  }
  return <Link href={href} onClick={handle} {...rest} />;
}
