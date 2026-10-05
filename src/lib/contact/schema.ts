/**
 * Contact form definition and validation. Shared by the client form (for
 * option lists and length limits) and the server action (for enforcement).
 * The server is the source of truth; client-side checks are only a courtesy.
 */

export const companySizes = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"] as const;

export const developmentStages = [
  "Prototype",
  "Pre-production",
  "Production",
  "Preparing for enterprise deployment",
  "Other",
] as const;

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  role: string;
  companySize: (typeof companySizes)[number];
  building: string;
  systems: string;
  stage: (typeof developmentStages)[number];
  testScope: string;
};

export type ContactField = keyof ContactSubmission;
export type FieldErrors = Partial<Record<ContactField, string>>;

export const limits = {
  name: 120,
  email: 254,
  company: 160,
  role: 120,
  building: 2000,
  systems: 2000,
  testScope: 2000,
} as const;

const emailPattern = /^[^\s@<>()[\]\\,;:"]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/;

/** Normalizes whitespace and strips control characters (keeping newlines in long text). */
function clean(value: FormDataEntryValue | null, multiline = false): string {
  if (typeof value !== "string") return "";
  const normalized = value.normalize("NFC").replace(/\r\n?/g, "\n");
  const stripped = multiline
    ? normalized.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    : normalized.replace(/[\u0000-\u001F\u007F]/g, " ");
  return multiline ? stripped.replace(/\n{3,}/g, "\n\n").trim() : stripped.replace(/\s+/g, " ").trim();
}

function isOneOf<T extends readonly string[]>(options: T, value: string): value is T[number] {
  return (options as readonly string[]).includes(value);
}

export type ValidationResult =
  | { ok: true; data: ContactSubmission }
  | { ok: false; errors: FieldErrors };

export function validateContact(formData: FormData): ValidationResult {
  const raw = {
    name: clean(formData.get("name")),
    email: clean(formData.get("email")).toLowerCase(),
    company: clean(formData.get("company")),
    role: clean(formData.get("role")),
    companySize: clean(formData.get("companySize")),
    building: clean(formData.get("building"), true),
    systems: clean(formData.get("systems"), true),
    stage: clean(formData.get("stage")),
    testScope: clean(formData.get("testScope"), true),
  };

  const errors: FieldErrors = {};

  const requireText = (field: keyof typeof limits, label: string, min = 1) => {
    const value = raw[field];
    if (value.length < min) errors[field] = min > 1 ? `Please add a little more detail (at least ${min} characters).` : `${label} is required.`;
    else if (value.length > limits[field]) errors[field] = `${label} must be ${limits[field]} characters or fewer.`;
  };

  requireText("name", "Name");
  requireText("company", "Company");
  requireText("role", "Role");
  requireText("building", "This field", 10);
  requireText("systems", "This field", 5);

  if (!raw.email) errors.email = "Work email is required.";
  else if (raw.email.length > limits.email || !emailPattern.test(raw.email)) errors.email = "Enter a valid email address.";

  if (!isOneOf(companySizes, raw.companySize)) errors.companySize = "Select a company size.";
  if (!isOneOf(developmentStages, raw.stage)) errors.stage = "Select a development stage.";
  if (raw.testScope.length > limits.testScope) errors.testScope = `Must be ${limits.testScope} characters or fewer.`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      ...raw,
      companySize: raw.companySize as ContactSubmission["companySize"],
      stage: raw.stage as ContactSubmission["stage"],
    },
  };
}
