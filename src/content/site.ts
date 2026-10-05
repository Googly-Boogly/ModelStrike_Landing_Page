/**
 * Global site configuration.
 *
 * Values that must come from the business are read from environment
 * variables so they never need to be hard-coded. See `.env.example`.
 * Anything left empty is hidden or replaced with a safe fallback in the UI.
 */

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "ModelStrike",
  tagline: "AI Agent Security",
  url: resolveSiteUrl(),
  title: "ModelStrike | AI Agent Security & Red Teaming",
  description:
    "ModelStrike security-tests AI agents, tools, MCP integrations, permissions, and autonomous workflows before they become production vulnerabilities.",

  /** Public inbox for general enquiries. Empty = not shown. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Address for vulnerability reports. Empty = security page falls back to the contact form. */
  securityEmail: process.env.NEXT_PUBLIC_SECURITY_EMAIL ?? "",
  /**
   * External scheduling link (Cal.com, Calendly, etc.). When empty, every
   * "Book" CTA routes to the on-site contact form instead.
   */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  /** Full public profile URLs, e.g. https://www.linkedin.com/company/... */
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    x: process.env.NEXT_PUBLIC_X_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  },
} as const;

export const bookingHref = site.bookingUrl || "/contact";

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "What We Test", href: "/#what-we-test" },
  { label: "Methodology", href: "/#methodology" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Methodology", href: "/#methodology" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Security", href: "/security" },
];

export const socialLinks = (
  [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "X", href: site.social.x },
    { label: "GitHub", href: site.social.github },
  ] satisfies NavItem[]
).filter((link) => link.href);
