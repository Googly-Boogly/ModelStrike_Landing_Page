import { bookingHref } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { AttackSurfaceMap } from "@/components/diagrams/AttackSurfaceMap";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 h-[28rem] w-[56rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(195_52_58/0.14),transparent)]"
      />

      <Container className="relative grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pt-28 lg:pb-28">
        <div className="motion-safe:animate-rise">
          <Eyebrow>AI Agent Security</Eyebrow>
          <h1
            id="hero-title"
            className="mt-6 text-[2.15rem] leading-[1.1] font-semibold tracking-tight text-balance text-fg sm:text-5xl lg:text-[3.4rem]"
          >
            Your AI agent has access.{" "}
            <span className="text-fg-muted">We find out what happens when that access is abused.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-fg-muted sm:text-lg">
            ModelStrike red-teams AI agents, tools, permissions, prompts, and integrations to uncover security failures
            before attackers—or autonomous systems themselves—turn them into incidents.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={bookingHref} size="lg" arrow>
              Book an AI Security Assessment
            </ButtonLink>
            <ButtonLink href="/#what-we-test" size="lg" variant="secondary">
              See What We Test
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-fg-subtle">
            For teams shipping AI agents, copilots, and agentic workflows into production.
          </p>
        </div>

        <div className="motion-safe:animate-rise motion-safe:[animation-delay:120ms]">
          <AttackSurfaceMap />
        </div>
      </Container>
    </section>
  );
}
