"use client";

import { useActionState, useEffect, useRef, startTransition, type FormEvent, type ReactNode } from "react";
import { submitContact, type ContactFormState } from "@/app/contact/actions";
import { companySizes, developmentStages, limits, type ContactField } from "@/lib/contact/schema";
import { buttonClasses } from "@/components/ui/Button";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "block w-full rounded-md border border-line-strong bg-ink-950 px-3.5 py-2.5 text-sm text-fg placeholder:text-fg-subtle transition-colors hover:border-fg-subtle focus:border-strike-400 focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-strike-400/30 aria-[invalid=true]:border-strike-400";

type FieldProps = {
  name: ContactField;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (props: { id: string; "aria-describedby"?: string; "aria-invalid"?: true }) => ReactNode;
};

function Field({ name, label, hint, optional, error, className = "", children }: FieldProps) {
  const id = `contact-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-fg">
        {label}
        {optional && <span className="text-xs font-normal text-fg-subtle">Optional</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-fg-subtle">
          {hint}
        </p>
      )}
      <div className="mt-2">{children({ id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-strike-300">
          {error}
        </p>
      )}
    </div>
  );
}

type ContactFormProps = {
  deliveryEnabled: boolean;
  contactEmail: string;
};

export function ContactForm({ deliveryEnabled, contactEmail }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    } else if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  // Submitting via onSubmit (rather than only the action prop) keeps the
  // visitor's input in place when the server returns validation errors.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("elapsedMs", String(Date.now() - mountedAt.current));
    startTransition(() => formAction(formData));
  }

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-lg border border-line-strong bg-ink-900 p-8 focus:outline-none">
        <p className="font-mono text-xs tracking-[0.16em] text-strike-400 uppercase">Request received</p>
        <p className="mt-3 text-lg text-fg">{state.message}</p>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const fallbackEmail = contactEmail ? (
    <>
      {" "}
      Email us at{" "}
      <a href={`mailto:${contactEmail}`} className="text-fg underline underline-offset-4">
        {contactEmail}
      </a>
      .
    </>
  ) : null;

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="space-y-6" aria-describedby="contact-form-note">
      {!deliveryEnabled && (
        <div className="rounded-md border border-dashed border-line-strong bg-ink-900 px-4 py-3 text-sm text-fg-muted">
          Online submissions are not connected yet, so this form can&apos;t send requests.{fallbackEmail}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" error={errors.name}>
          {(a11y) => <input {...a11y} name="name" type="text" autoComplete="name" required maxLength={limits.name} className={inputClasses} />}
        </Field>
        <Field name="email" label="Work email" error={errors.email}>
          {(a11y) => (
            <input {...a11y} name="email" type="email" autoComplete="email" required maxLength={limits.email} spellCheck={false} className={inputClasses} />
          )}
        </Field>
        <Field name="company" label="Company" error={errors.company}>
          {(a11y) => (
            <input {...a11y} name="company" type="text" autoComplete="organization" required maxLength={limits.company} className={inputClasses} />
          )}
        </Field>
        <Field name="role" label="Role" error={errors.role}>
          {(a11y) => (
            <input
              {...a11y}
              name="role"
              type="text"
              autoComplete="organization-title"
              placeholder="e.g. CTO, Head of Security"
              required
              maxLength={limits.role}
              className={inputClasses}
            />
          )}
        </Field>
        <Field name="companySize" label="Company size" error={errors.companySize}>
          {(a11y) => (
            <select {...a11y} name="companySize" required defaultValue="" className={inputClasses}>
              <option value="" disabled>
                Select…
              </option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size} employees
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field name="stage" label="Where are you in development?" error={errors.stage}>
          {(a11y) => (
            <select {...a11y} name="stage" required defaultValue="" className={inputClasses}>
              <option value="" disabled>
                Select…
              </option>
              {developmentStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field name="building" label="What are you building?" hint="A short description of the agent, copilot, or workflow." error={errors.building}>
        {(a11y) => <textarea {...a11y} name="building" rows={4} required minLength={10} maxLength={limits.building} className={inputClasses} />}
      </Field>

      <Field
        name="systems"
        label="What systems can the AI access?"
        hint="For example: internal APIs, customer data, databases, files, browser, email, MCP servers. No credentials or secrets, please."
        error={errors.systems}
      >
        {(a11y) => <textarea {...a11y} name="systems" rows={3} required minLength={5} maxLength={limits.systems} className={inputClasses} />}
      </Field>

      <Field name="testScope" label="What would you like us to test?" optional error={errors.testScope}>
        {(a11y) => <textarea {...a11y} name="testScope" rows={3} maxLength={limits.testScope} className={inputClasses} />}
      </Field>

      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        ref={statusRef}
        tabIndex={-1}
        role={state.status === "idle" ? undefined : "alert"}
        className="focus:outline-none empty:hidden"
      >
        {state.status !== "idle" && (
          <p className="rounded-md border border-strike-500/50 bg-strike-700/10 px-4 py-3 text-sm text-fg">
            {state.message}
            {state.status === "unavailable" && fallbackEmail}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="max-w-sm text-xs leading-relaxed text-fg-subtle">
          We use these details only to respond to your request. Please don&apos;t include credentials, secrets, or
          customer data.
        </p>
        <button type="submit" disabled={pending} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
          {pending ? "Sending…" : "Request Assessment"}
        </button>
      </div>
    </form>
  );
}
