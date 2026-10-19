import Link from "next/link";
import { connection } from "next/server";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { isDeliveryConfigured } from "@/lib/contact/delivery";
import { CalEmbed } from "@/components/contact/CalEmbed";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CheckList } from "@/components/ui/CheckList";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = pageMetadata({
  title: "Book an AI Security Assessment",
  description:
    "Request an AI agent security assessment from ModelStrike. Tell us what you're building and what your AI can access.",
  path: "/contact",
});

const laterSteps = [
  "We agree scope, environments, rules of engagement, and written authorization before any testing.",
  "You receive a proposal sized to your architecture and timeline.",
];

export default async function ContactPage() {
  // Render per request so the "not connected" notice reflects runtime env
  // (e.g. values supplied to a Docker container), not the build environment.
  await connection();

  const deliveryEnabled = isDeliveryConfigured();
  // The calendar unlocks after the form is sent. If the form can't deliver
  // yet, show the calendar up front instead so bookings still work.
  const gatedCalLink = deliveryEnabled ? site.calLink : "";
  const openCalLink = deliveryEnabled ? "" : site.calLink;
  const nextSteps = [
    gatedCalLink
      ? "Once you send the form, you pick a time for a short scoping call."
      : "We review what you've shared and follow up to schedule a short scoping call.",
    ...laterSteps,
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Book an AI Security Assessment"
        intro={
          gatedCalLink ? (
            <p>
              Tell us about your agent, what it can access, and where you are in development, then pick a time for a
              short scoping call. The more context you share, the more useful that conversation will be.
            </p>
          ) : openCalLink ? (
            <p>
              Pick a time for a short scoping call below, or tell us about your agent first using the form. The more
              context you share, the more useful our first conversation will be.
            </p>
          ) : (
            <p>
              Tell us about your agent, what it can access, and where you are in development. The more context you
              share, the more useful our first conversation will be.
            </p>
          )
        }
      />
      {openCalLink && (
        <Section id="schedule" labelledBy="schedule-title" divided={false} className="pt-12! sm:pt-16!">
          <SectionHeader
            id="schedule-title"
            eyebrow="Schedule"
            title="Book a scoping call"
            intro={<p>Choose a time that works for you. You&apos;ll get a calendar invite and confirmation by email.</p>}
          />
          <div className="mt-10">
            <CalEmbed calLink={openCalLink} />
          </div>
        </Section>
      )}
      <Section
        id="request"
        labelledBy={openCalLink ? "request-title" : undefined}
        divided={Boolean(openCalLink)}
        className={openCalLink ? "" : "pt-12! sm:pt-16!"}
      >
        {openCalLink && (
          <div className="mb-12">
            <SectionHeader
              id="request-title"
              eyebrow="Or write to us"
              title="Tell us about your system first"
              intro={<p>Prefer to share context before picking a time? Send a request and we&apos;ll follow up.</p>}
            />
          </div>
        )}
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <ContactForm deliveryEnabled={deliveryEnabled} contactEmail={site.contactEmail} calLink={gatedCalLink || undefined} />

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
