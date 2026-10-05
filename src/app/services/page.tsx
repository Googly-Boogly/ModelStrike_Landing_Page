import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { CheckList } from "@/components/ui/CheckList";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "AI Agent Security Services",
  description:
    "AI agent security assessments, agentic red teaming, MCP security testing, LLM application security, pre-deployment reviews, and threat modeling for agentic systems.",
  path: "/services",
});

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.summary,
      serviceType: "AI security testing",
      provider: { "@type": "Organization", name: site.name, url: site.url },
      url: `${site.url}/services#${service.slug}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Security testing for AI agents and the systems they can reach."
        intro={
          <>
            <p>
              ModelStrike offers expert-led engagements covering AI agents, LLM applications, MCP integrations, and
              the architecture around them.
            </p>
            <p>
              No two agent architectures are the same. Engagement scope, depth, and duration are set after we
              understand your system, its permissions, and what you need to demonstrate — internally or to customers.
            </p>
          </>
        }
      >
        <nav aria-label="Services on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-block rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                >
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section divided={false} className="pt-8! sm:pt-12!">
        <div className="divide-y divide-line">
          {services.map((service, index) => (
            <article
              key={service.slug}
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid gap-8 py-12 first:pt-4 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
            >
              <div>
                <p aria-hidden="true" className="font-mono text-xs text-strike-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${service.slug}-title`} className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">{service.detail}</p>
                <p className="mt-5 text-sm text-fg-subtle">
                  <span className="text-fg-muted">Good fit:</span> {service.goodFit}
                </p>
              </div>
              <div className="rounded-lg border border-line bg-ink-900 p-6">
                <h3 className="mb-4 font-mono text-[0.7rem] tracking-[0.16em] text-fg-subtle uppercase">Typical coverage</h3>
                <CheckList items={service.includes} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CTASection
        title="Not sure which engagement fits?"
        body="Tell us what your agent does and what it can reach. We'll recommend a scope that matches your architecture and timeline."
      />
      <JsonLd data={servicesJsonLd} />
    </>
  );
}
