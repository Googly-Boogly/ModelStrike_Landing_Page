import Link from "next/link";
import { connection } from "next/server";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { isDeliveryConfigured } from "@/lib/contact/delivery";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CheckList } from "@/components/ui/CheckList";

export const metadata = pageMetadata({
  title: "Book an AI Security Assessment",
  description:
    "Request an AI agent security assessment from ModelStrike. Tell us what you're building and what your AI can access.",
  path: "/contact",
});

const nextSteps = [
  "We review what you've shared and follow up to schedule a short scoping call.",
  "We agree scope, environments, rules of engagement, and written authorization before any testing.",
  "You receive a proposal sized to your architecture and timeline.",
];

export default async function ContactPage() {
  // Render per request so the "not connected" notice reflects runtime env
  // (e.g. values supplied to a Docker container), not the build environment.
  await connection();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book an AI Security Assessment"
        intro={
          <p>
            Tell us about your agent, what it can access, and where you are in development. The more context you
            share, the more useful our first conversation will be.
          </p>
        }
      />
      <Section divided={false} className="pt-12! sm:pt-16!">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <ContactForm deliveryEnabled={isDeliveryConfigured()} contactEmail={site.contactEmail} />

          <aside aria-labelledby="next-steps-title" className="space-y-8 lg:pt-1">
            <div>
              <h2 id="next-steps-title" className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
                What happens next
              </h2>
              <CheckList items={nextSteps} className="mt-4" />
            </div>
            <div className="rounded-lg border border-line bg-ink-900 p-5 text-sm leading-relaxed text-fg-muted">
              <h2 className="font-medium text-fg">Reporting a vulnerability?</h2>
              <p className="mt-2">
                Please see our{" "}
                <Link href="/security" className="text-fg underline underline-offset-4 hover:text-strike-300">
                  security and responsible disclosure page
                </Link>
                .
              </p>
            </div>
            {site.contactEmail && (
              <p className="text-sm text-fg-muted">
                Prefer email?{" "}
                <a href={`mailto:${site.contactEmail}`} className="text-fg underline underline-offset-4 hover:text-strike-300">
                  {site.contactEmail}
                </a>
              </p>
            )}
          </aside>
        </div>
      </Section>
    </>
  );
}
