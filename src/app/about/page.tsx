import { pageMetadata } from "@/lib/metadata";
import { team } from "@/content/about";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamCard } from "@/components/cards/TeamCard";

export const metadata = pageMetadata({
  title: "About",
  description:
    "ModelStrike focuses on agentic AI security — the boundary where application vulnerabilities meet model-driven behavior in AI agents.",
  path: "/about",
});

const agentVerbs = ["Browse", "Execute", "Retrieve", "Modify", "Communicate", "Purchase", "Deploy", "Operate software"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ModelStrike"
        title="ModelStrike exists because AI systems are becoming actors, not just interfaces."
        intro={
          <p>
            Traditional chatbots mostly produced text. If one was manipulated, the damage was usually limited to what
            it said. Agents are different.
          </p>
        }
      />

      <Section labelledBy="agents-act-title" divided={false}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="agents-act-title" className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Agents can:
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
              {agentVerbs.map((verb) => (
                <li key={verb} className="bg-ink-900 px-5 py-4 font-mono text-sm text-fg">
                  {verb}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5 self-center text-base leading-relaxed text-fg-muted sm:text-lg">
            <p>
              When software can decide which actions to take, security testing must account for both application
              vulnerabilities and model-driven behavior.
            </p>
            <p>
              A conventional penetration test asks whether an endpoint can be abused. An agent assessment also asks
              whether the system can be <em className="text-fg not-italic">talked into</em> abusing it — by a user, by
              a document it reads, or by its own chain of decisions.
            </p>
            <p className="text-fg">ModelStrike focuses on that boundary.</p>
          </div>
        </div>
      </Section>

      <Section labelledBy="approach-title">
        <SectionHeader
          id="approach-title"
          eyebrow="Approach"
          title="Expert assessments today. Repeatable tooling over time."
          intro={
            <p>
              ModelStrike begins with hands-on, expert-led security assessments. As testing techniques prove
              repeatable across engagements, our direction is to turn them into automated AI-security tooling — so
              teams can keep testing as their agents change.
            </p>
          }
        />
      </Section>

      {team.length > 0 && (
        <Section labelledBy="team-title">
          <SectionHeader id="team-title" eyebrow="Team" title="Who you'll work with" />
          <ul className={`mt-10 grid gap-4 ${team.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
            {team.map((member) => (
              <li key={member.slug}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection />
    </>
  );
}
