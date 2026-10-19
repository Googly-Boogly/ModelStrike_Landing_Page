import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";

/*
 * STARTER PRIVACY POLICY — NOT LEGAL ADVICE.
 *
 * This is a structural draft. Before launch, have it reviewed by qualified
 * counsel and update it once the following are decided:
 *   - hosting provider and region
 *   - contact form delivery (email provider, webhook target, CRM)
 *   - analytics (if any) and whether it sets cookies
 *   - scheduling tool (Cal.com if NEXT_PUBLIC_CAL_LINK is set, or whatever
 *     NEXT_PUBLIC_BOOKING_URL points to)
 *   - legal entity name, registered address, and applicable jurisdictions
 *   - retention periods and data subject request process
 * Update LAST_UPDATED whenever the substance changes.
 */
const LAST_UPDATED = "2026-10-01";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How ModelStrike collects, uses, and protects information submitted through this website.",
  path: "/privacy",
});

function PolicySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="text-xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-fg-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const contactLine = site.contactEmail ? (
    <a href={`mailto:${site.contactEmail}`} className="text-fg underline underline-offset-4">
      {site.contactEmail}
    </a>
  ) : (
    <Link href="/contact" className="text-fg underline underline-offset-4">
      our contact form
    </Link>
  );

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        intro={
          <p>
            Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>.
          </p>
        }
      />
      <Section divided={false} className="pt-12! sm:pt-16!">
        <div className="max-w-3xl space-y-12">
          <p className="rounded-md border border-dashed border-line-strong px-4 py-3 text-sm text-fg-subtle">
            This policy is a working draft and is subject to legal review. It will be updated as our data-processing
            providers are finalized.
          </p>

          <PolicySection id="who-we-are" title="Who we are">
            <p>
              This website is operated by {site.name}. This policy explains what information we collect through the
              website, how we use it, and the choices you have.
            </p>
          </PolicySection>

          <PolicySection id="what-we-collect" title="Information we collect">
            <p>
              <strong className="text-fg">Information you provide.</strong> When you submit the contact form we
              collect your name, work email, company, role, company size, and the details you share about your
              system and development stage.
            </p>
            <p>
              <strong className="text-fg">Technical information.</strong> Our hosting infrastructure may process
              standard request data such as IP address, browser type, and pages requested, for security and
              operational purposes. We use limited, short-lived processing of IP addresses to prevent form abuse.
            </p>
            <p>
              <strong className="text-fg">Cookies and analytics.</strong> This website does not currently use
              advertising or cross-site tracking cookies. If we introduce analytics, we will prefer privacy-respecting
              tools and update this policy first.
            </p>
          </PolicySection>

          <PolicySection id="how-we-use" title="How we use information">
            <p>
              We use the information you submit to respond to your enquiry, scope and propose an engagement, and
              communicate with you about it. We do not sell personal information.
            </p>
          </PolicySection>

          <PolicySection id="sharing" title="Service providers">
            <p>
              We rely on service providers to host this website and deliver form submissions. They process
              information on our behalf and only as needed to provide their services. A list of providers will be
              published here once finalized.
            </p>
          </PolicySection>

          <PolicySection id="retention" title="Retention">
            <p>
              We keep enquiry information only as long as needed for the purposes described above, or as required by
              law. Specific retention periods will be documented here.
            </p>
          </PolicySection>

          <PolicySection id="security" title="Security">
            <p>
              We apply reasonable technical and organizational measures to protect information. No method of
              transmission or storage is completely secure. Please do not submit credentials, secrets, or customer
              data through the website. See our{" "}
              <Link href="/security" className="text-fg underline underline-offset-4">
                security page
              </Link>{" "}
              for responsible disclosure.
            </p>
          </PolicySection>

          <PolicySection id="rights" title="Your choices and rights">
            <p>
              Depending on where you live, you may have rights to access, correct, delete, or restrict use of your
              personal information. To make a request, contact us via {contactLine}.
            </p>
          </PolicySection>

          <PolicySection id="changes" title="Changes to this policy">
            <p>We will update this page when our practices change and revise the date above.</p>
          </PolicySection>
        </div>
      </Section>
    </>
  );
}
