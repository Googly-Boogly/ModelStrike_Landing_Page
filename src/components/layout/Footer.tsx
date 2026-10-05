import Link from "next/link";
import { footerNav, site, socialLinks } from "@/content/site";
import { Container } from "@/components/ui/Section";
import { CurrentYear } from "./CurrentYear";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-900">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">{site.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Security assessments and red teaming for AI agents, LLM applications, and the tools they can reach.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-fg-muted transition-colors hover:text-fg">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {(socialLinks.length > 0 || site.contactEmail) && (
              <ul className="space-y-3 text-sm" aria-label="Contact channels">
                {site.contactEmail && (
                  <li>
                    <a href={`mailto:${site.contactEmail}`} className="text-fg-muted transition-colors hover:text-fg">
                      {site.contactEmail}
                    </a>
                  </li>
                )}
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} rel="noopener noreferrer" target="_blank" className="text-fg-muted transition-colors hover:text-fg">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-xs text-fg-subtle">
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
