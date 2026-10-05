import { featuredServices } from "@/content/services";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  return (
    <Section id="services" labelledBy="services-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          id="services-title"
          eyebrow="Services"
          title="Expert-led AI agent security engagements."
          intro={<p>Every engagement is scoped to your architecture, risk profile, and timeline.</p>}
        />
        <ButtonLink href="/services" variant="secondary" arrow className="self-start lg:self-auto">
          All services
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {featuredServices.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-line px-6 py-5 sm:flex-row sm:items-center">
        <p className="text-sm text-fg-muted">Pricing depends on scope. Tell us about your system and we&apos;ll propose an engagement.</p>
        <ButtonLink href="/contact" variant="ghost" arrow className="px-0">
          Talk to ModelStrike
        </ButtonLink>
      </div>
    </Section>
  );
}
