import { agentCapabilities, risks } from "@/content/home";
import { RiskCard } from "@/components/cards/RiskCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function AttackSurface() {
  return (
    <Section id="attack-surface" labelledBy="attack-surface-title">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <SectionHeader
          id="attack-surface-title"
          eyebrow="The problem"
          title="AI agents create a new attack surface."
          intro={
            <>
              <p>
                Traditional application security still matters. But agentic systems add security boundaries that
                conventional testing was never designed to reach, because the model itself now decides what happens
                next.
              </p>
              <p>An AI agent can:</p>
            </>
          }
        />
        <ul className="grid content-start gap-px self-end overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {agentCapabilities.map((capability) => (
            <li key={capability} className="flex items-center gap-3 bg-ink-900 px-5 py-4 text-sm text-fg">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-strike-400" />
              {capability.charAt(0).toUpperCase() + capability.slice(1)}
            </li>
          ))}
          <li className="bg-ink-900 px-5 py-4 text-sm text-fg-subtle italic">…often in a single request.</li>
        </ul>
      </div>

      <h3 className="mt-20 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">Where agentic systems fail</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risks.map((risk, index) => (
          <RiskCard key={risk.title} risk={risk} index={index} />
        ))}
      </div>
      <p className="mt-6 text-sm text-fg-subtle">
        These are common starting points, not a complete list. Every assessment is shaped by your architecture.
      </p>
    </Section>
  );
}
