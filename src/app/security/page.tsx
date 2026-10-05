import Link from "next/link";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CheckList } from "@/components/ui/CheckList";

export const metadata = pageMetadata({
  title: "Security & Responsible Disclosure",
  description: "How to report a security vulnerability in ModelStrike's website or services.",
  path: "/security",
});

const inScope = ["This website and its contact form", "Any other ModelStrike-operated domain or service"];

const guidelines = [
  "Only test against systems you are authorized to test, and avoid accessing, modifying, or deleting data that isn't yours.",
  "Do not run denial-of-service, spam, social engineering, or physical attacks.",
  "Give us reasonable time to investigate and remediate before any public disclosure.",
  "Include enough detail for us to reproduce the issue: affected URL, steps, and potential impact.",
];

const commitments = [
  "Acknowledge your report and keep you informed as we investigate.",
  "Not pursue legal action against good-faith research that follows these guidelines.",
  "Credit you for the discovery if you'd like, once the issue is resolved.",
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Security & responsible disclosure"
        intro={
          <p>
            ModelStrike takes security seriously — including our own. If you believe you&apos;ve found a vulnerability in
            a ModelStrike system, we want to hear about it.
          </p>
        }
      />
      <Section divided={false} className="pt-12! sm:pt-16!">
        <div className="max-w-3xl space-y-14">
          <section aria-labelledby="report-title">
            <h2 id="report-title" className="text-2xl font-semibold tracking-tight text-fg">
              How to report
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-fg-muted">
              {site.securityEmail ? (
                <p>
                  Email{" "}
                  <a href={`mailto:${site.securityEmail}`} className="text-fg underline underline-offset-4 hover:text-strike-300">
                    {site.securityEmail}
                  </a>{" "}
                  with a description of the issue. Please do not include sensitive data beyond what is needed to
                  demonstrate it.
                </p>
              ) : (
                <p>
                  A dedicated security contact address will be published here. Until then, please use the{" "}
                  <Link href="/contact" className="text-fg underline underline-offset-4 hover:text-strike-300">
                    contact form
                  </Link>{" "}
                  to request a secure channel, without including vulnerability details in the initial message.
                </p>
              )}
            </div>
          </section>

          <section aria-labelledby="scope-title">
            <h2 id="scope-title" className="text-2xl font-semibold tracking-tight text-fg">
              Scope
            </h2>
            <CheckList items={inScope} className="mt-4 text-base" />
            <p className="mt-4 text-sm text-fg-subtle">
              Third-party services we use are covered by their own disclosure policies.
            </p>
          </section>

          <section aria-labelledby="guidelines-title">
            <h2 id="guidelines-title" className="text-2xl font-semibold tracking-tight text-fg">
              Guidelines
            </h2>
            <CheckList items={guidelines} className="mt-4 text-base" />
          </section>

          <section aria-labelledby="commitments-title">
            <h2 id="commitments-title" className="text-2xl font-semibold tracking-tight text-fg">
              Our commitments
            </h2>
            <CheckList items={commitments} className="mt-4 text-base" />
            <p className="mt-6 text-sm text-fg-subtle">
              ModelStrike does not currently operate a paid bug bounty program.
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
