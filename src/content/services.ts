/**
 * Service offerings. `featured` services appear as cards on the homepage;
 * all services appear on /services.
 */

export type Service = {
  slug: string;
  title: string;
  summary: string;
  /** Longer description shown on the services page. */
  detail: string;
  includes: string[];
  goodFit: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "agent-security-assessment",
    title: "AI Agent Security Assessment",
    summary: "Manual adversarial review of an agentic application and its surrounding architecture.",
    detail:
      "A structured, hands-on assessment of your agent and everything it can reach. We map how instructions, data, and permissions flow through the system, then test where those boundaries break under adversarial pressure.",
    includes: [
      "Threat modeling",
      "Attack surface mapping",
      "Adversarial testing",
      "Tool and permission review",
      "Exploit validation",
      "Remediation guidance",
    ],
    goodFit: "Teams with an agent in, or close to, production who want a clear picture of real risk.",
    featured: true,
  },
  {
    slug: "agentic-red-team",
    title: "AI Agent Red Team",
    summary: "A deeper offensive engagement focused on discovering realistic attack chains across the AI system.",
    detail:
      "Goal-driven offensive testing that behaves like a motivated attacker. Rather than checking items off a list, we pursue realistic objectives — reaching data, triggering actions, escalating privileges — across the model, tools, and connected systems.",
    includes: [
      "Prompt injection",
      "Indirect prompt injection",
      "Privilege escalation",
      "Tool abuse",
      "Data extraction",
      "Cross-system attack chains",
      "Autonomous failure scenarios",
    ],
    goodFit: "Agents with broad tool access, sensitive data, or high-impact actions.",
    featured: true,
  },
  {
    slug: "pre-deployment-review",
    title: "Pre-Deployment Security Review",
    summary: "For teams preparing to launch an AI feature or complete an enterprise security review.",
    detail:
      "A focused review timed for launch or procurement. We assess the architecture and controls you plan to ship with, validate guardrails, and leave you with a prioritized plan and clearer answers for security questionnaires.",
    includes: [
      "Architecture review",
      "Production-risk analysis",
      "Guardrail validation",
      "Authorization review",
      "Deployment recommendations",
      "Prioritized remediation report",
    ],
    goodFit: "Launches, major capability expansions, and enterprise security reviews.",
    featured: true,
  },
  {
    slug: "mcp-security-testing",
    title: "MCP Security Testing",
    summary: "Security testing of Model Context Protocol servers, clients, and the capabilities they expose.",
    detail:
      "MCP makes it easy to hand an agent new capabilities — and easy to hand over too much. We review the servers you build or depend on for exposed capabilities, authorization gaps, tool description manipulation, and unsafe handling of model-supplied input.",
    includes: [
      "Capability and scope review",
      "Server authentication and authorization",
      "Tool description and metadata manipulation",
      "Input handling in tool implementations",
      "Third-party server trust assessment",
    ],
    goodFit: "Teams publishing MCP servers or connecting agents to internal or third-party MCP servers.",
  },
  {
    slug: "llm-application-security",
    title: "LLM Application Security",
    summary: "Security testing for LLM-powered features, copilots, and RAG applications.",
    detail:
      "Not every LLM feature is a fully autonomous agent, but most still handle untrusted input and sensitive data. We test prompt handling, retrieval, output handling, and the application security around the model.",
    includes: [
      "Direct and indirect prompt injection",
      "RAG and retrieval pipeline review",
      "Sensitive data exposure",
      "Insecure output handling",
      "Tenant isolation",
    ],
    goodFit: "Copilots, chat assistants, and retrieval-augmented features.",
  },
  {
    slug: "architecture-threat-modeling",
    title: "Architecture Threat Modeling",
    summary: "Design-stage threat modeling for agentic systems before the code is written — or before it grows.",
    detail:
      "The cheapest time to fix an over-permissioned agent is before it ships. We work with your engineers to model trust boundaries, data flows, and high-impact actions, and recommend controls that fit your architecture.",
    includes: [
      "Trust boundary and data flow mapping",
      "Permission and least-privilege design",
      "Human approval checkpoints",
      "Logging and detection recommendations",
      "Prioritized design recommendations",
    ],
    goodFit: "Teams designing a new agent or significantly expanding an existing one.",
  },
];

export const featuredServices = services.filter((service) => service.featured);
