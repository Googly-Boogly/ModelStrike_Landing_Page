/**
 * Homepage copy. Edit text here; components only handle layout.
 */

/** Short engagement story shown in the hero. */
export const heroProofPoint =
  "A translation agent was handed text with a command hidden inside it. Instead of translating the command, the agent obeyed it. We confirmed the exploit with a planted canary string — a deterministic result, not a guess — and delivered the fix.";

export type CaseStudy = {
  title: string;
  meta: { label: string; value: string }[];
  sections: { heading: string; body: string }[];
  disclaimer: string;
};

/** Full write-up behind `heroProofPoint`, rendered in the case-study section. */
export const caseStudy: CaseStudy = {
  title: "Prompt injection in a translation agent",
  meta: [
    { label: "Severity", value: "High" },
    { label: "Category", value: "OWASP LLM01: Prompt Injection" },
    { label: "Status", value: "Confirmed, remediated" },
  ],
  sections: [
    {
      heading: "What we tested",
      body: "A translation agent was asked to translate a block of text into several languages. Hidden inside that text was an instruction aimed at the agent itself, telling it to stop its task and output a fixed string.",
    },
    {
      heading: "What we found",
      body: "The agent obeyed the hidden instruction instead of translating it — it emitted the attacker’s string and invented status details that were never part of the task. Because the agent read untrusted input in the same channel as its own instructions, anyone who controlled that input could redirect its behavior.",
    },
    {
      heading: "Why it matters",
      body: "On a translation demo the damage looks small. The mechanism is the risk: the same path applies to any agent that can take actions. An agent that can be steered by its own inputs can be pushed to issue refunds, send emails, or reach data it shouldn’t — with no login required, just text the agent will read.",
    },
    {
      heading: "How we proved it",
      body: "We don’t let a model grade its own output. We plant a unique canary string and confirm the exploit only if that string surfaces where it shouldn’t. Deterministic evidence, near-zero false positives — the standard your auditors and enterprise reviewers expect.",
    },
    {
      heading: "The fix we delivered",
      body: "Separate data from instructions, validate the output against the task, scope the agent to least privilege, and require human approval for any high-impact action.",
    },
  ],
  disclaimer:
    "This is a sanitized example. Every engagement is run only against systems you authorize, in a staging environment, under a signed rules-of-engagement agreement.",
};

export const agentCapabilities = [
  "interpret untrusted instructions",
  "invoke tools",
  "call APIs",
  "access sensitive information",
  "retrieve external context",
  "make autonomous decisions",
  "chain multiple actions together",
] as const;

export type Risk = { title: string; question: string };

export const risks: Risk[] = [
  {
    title: "Prompt Injection",
    question: "Can an attacker manipulate the agent through direct or indirect instructions?",
  },
  {
    title: "Tool Abuse",
    question: "Can the agent invoke legitimate tools in unintended or dangerous ways?",
  },
  {
    title: "Excessive Agency",
    question: "Can the system take actions beyond what the user or developer intended?",
  },
  {
    title: "Data Exfiltration",
    question: "Can sensitive context, credentials, documents, or retrieved information escape?",
  },
  {
    title: "Authorization Failures",
    question: "Can the agent cross boundaries between users, tenants, resources, or privilege levels?",
  },
  {
    title: "Agent Chaining",
    question: "Can individually safe actions be combined into a dangerous multi-step sequence?",
  },
];

export type TestArea = { group: string; items: string[] };

export const testAreas: TestArea[] = [
  {
    group: "Instructions & context",
    items: [
      "Prompts and system instructions",
      "Retrieval pipelines",
      "Agent memory",
      "Multi-agent communication",
      "Data handling",
    ],
  },
  {
    group: "Tools & integrations",
    items: [
      "Tool schemas",
      "Function calling",
      "MCP implementations",
      "API integrations",
      "Browser and computer control",
    ],
  },
  {
    group: "Access & control",
    items: [
      "Authorization",
      "Authentication boundaries",
      "Secrets exposure",
      "Human approval boundaries",
      "Dangerous action chains",
    ],
  },
];

export type Step = { number: string; title: string; body: string };

export const methodology: Step[] = [
  {
    number: "01",
    title: "Map",
    body: "Understand the architecture, permissions, data, tools, trust boundaries, and business-critical actions.",
  },
  {
    number: "02",
    title: "Attack",
    body: "Test the system adversarially across prompts, tools, integrations, authorization, data access, and multi-step workflows.",
  },
  {
    number: "03",
    title: "Validate",
    body: "Separate theoretical concerns from reproducible security failures and document the attack path.",
  },
  {
    number: "04",
    title: "Fix",
    body: "Provide prioritized findings, remediation recommendations, and retesting guidance.",
  },
];

export type ExampleFinding = { category: string; description: string };

/** Illustrative issue types only. These are not results from real engagements. */
export const exampleFindings: ExampleFinding[] = [
  { category: "Prompt injection", description: "Indirect prompt injection causing unauthorized tool execution" },
  { category: "Authorization", description: "Agent accessing resources outside the intended user's authorization boundary" },
  { category: "Data exposure", description: "Sensitive information leaking through retrieved context" },
  { category: "MCP", description: "Overly permissive MCP server exposing dangerous capabilities" },
  { category: "Approval controls", description: "Confirmation controls bypassed through multi-step agent behavior" },
  { category: "Untrusted input", description: "Attacker-controlled content influencing downstream agent decisions" },
  { category: "Secrets", description: "Credentials or secrets becoming accessible to model context" },
  { category: "Action chaining", description: "Chained low-risk actions producing a high-impact outcome" },
];

export const disciplines = [
  {
    title: "Offensive security",
    body: "Adversarial thinking, exploit validation, and an attacker's view of what is actually reachable.",
  },
  {
    title: "AI engineering",
    body: "How models, prompts, retrieval, memory, and tool calling behave in real production stacks.",
  },
  {
    title: "Autonomous agents",
    body: "Planning loops, multi-step execution, delegation between agents, and where autonomy creates new failure modes.",
  },
  {
    title: "Application security",
    body: "Authentication, authorization, tenancy, secrets, and API security — the foundations agents inherit.",
  },
] as const;

export const audiences = [
  {
    title: "You're deploying an AI agent",
    body: "Your product can act — not just answer questions.",
  },
  {
    title: "Your agent touches sensitive systems",
    body: "It can reach customer data, APIs, internal documents, browsers, databases, or infrastructure.",
  },
  {
    title: "Enterprise customers are asking security questions",
    body: "You need stronger answers about how your AI system behaves adversarially.",
  },
  {
    title: "You're giving an LLM more autonomy",
    body: "Permissions and attack impact increase as capabilities expand.",
  },
] as const;

export const principles = [
  { title: "Minimize permissions", body: "Grant each agent and tool only the access the task requires." },
  { title: "Isolate trust boundaries", body: "Separate users, tenants, tools, and data so one failure stays local." },
  { title: "Assume external context can be hostile", body: "Web pages, documents, emails, and tool output can all carry instructions." },
  { title: "Validate actions, not intent", body: "Enforce policy on what the agent does, rather than trusting what the model meant." },
  { title: "Require approval for high-impact actions", body: "Put a human in the loop where the consequences are hard to reverse." },
  { title: "Log security-relevant activity", body: "Record tool calls, data access, and decisions so incidents can be investigated." },
  { title: "Design failures to be contained", body: "Plan for the agent being wrong or manipulated, and limit the blast radius." },
] as const;
