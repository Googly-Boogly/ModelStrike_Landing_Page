"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

type MobileNavProps = { items: NavItem[]; bookingHref: string };

export function MobileNav({ items, bookingHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-md border border-line-strong text-fg-muted transition-colors hover:text-fg"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5" fill="none">
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-ink-950 shadow-2xl shadow-black/60"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block border-b border-line py-3.5 text-base text-fg-muted transition-colors last:border-0 hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <ButtonLink href={bookingHref} size="lg" className="w-full" onClick={close}>
              Book an AI Security Assessment
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
