import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <Eyebrow>404</Eyebrow>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-fg-muted">The link may be outdated, or the address may have a typo.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/">Back to home</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact ModelStrike
        </ButtonLink>
      </div>
    </Container>
  );
}
