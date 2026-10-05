import Link from "next/link";
import { bookingHref, primaryNav } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/85 backdrop-blur-md supports-[backdrop-filter]:bg-ink-950/70">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-fg-muted transition-colors hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={bookingHref}>Book Assessment</ButtonLink>
          </div>
          <MobileNav items={primaryNav} bookingHref={bookingHref} />
        </div>
      </Container>
    </header>
  );
}
