import { bookingHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

type CTASectionProps = {
  title?: string;
  body?: string;
};

export function CTASection({
  title = "Before you give an AI agent more access, find out how that access can fail.",
  body = "ModelStrike can evaluate your agent architecture, attack surface, and production security controls.",
}: CTASectionProps) {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line py-20 sm:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-32 mx-auto h-64 max-w-2xl bg-[radial-gradient(closest-side,rgb(195_52_58/0.18),transparent)]"
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 id="cta-title" className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">{body}</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={bookingHref} size="lg" arrow>
                Book an AI Security Assessment
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="secondary">
                Contact ModelStrike
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
