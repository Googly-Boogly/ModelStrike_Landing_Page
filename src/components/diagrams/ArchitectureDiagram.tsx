import type { ReactNode } from "react";

/**
 * "What we test" diagram: the path from a user to everything an agent can
 * reach. Built from lists so it reads correctly without visuals; the accent
 * diamonds mark trust boundaries that are tested along the way.
 */

const inputStages = ["User", "Prompt / Context", "Model"] as const;

const reachableSystems = [
  "Tools",
  "MCP Servers",
  "APIs",
  "Browser",
  "Files",
  "Databases",
  "External Services",
] as const;

function Boundary({ direction }: { direction: "vertical" | "responsive" }) {
  const line =
    direction === "vertical"
      ? "h-9 w-px"
      : "h-7 w-px sm:h-px sm:w-full sm:min-w-6";
  return (
    <div aria-hidden="true" className={`relative flex shrink-0 items-center justify-center ${direction === "responsive" ? "sm:flex-1" : ""}`}>
      <span className={`block bg-line-strong ${line}`} />
      <span className="absolute size-2 rotate-45 border border-strike-400 bg-ink-950" />
    </div>
  );
}

function Node({ children, emphasis = false, wrap = false }: { children: ReactNode; emphasis?: boolean; wrap?: boolean }) {
  return (
    <div
      className={`rounded-md border py-2.5 text-center font-mono text-xs sm:text-[0.8rem] ${wrap ? "flex h-full items-center justify-center px-2" : "px-4 whitespace-nowrap"} ${
        emphasis ? "border-fg-subtle bg-ink-800 text-fg" : "border-line-strong bg-ink-850 text-fg-muted"
      }`}
    >
      {children}
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <figure className="rounded-xl border border-line bg-ink-900 p-5 sm:p-8">
      <ol aria-label="Request path" className="flex flex-col items-center sm:flex-row sm:items-center">
        {inputStages.map((stage, index) => (
          <li key={stage} className={`flex flex-col items-center sm:flex-row ${index < inputStages.length - 1 ? "sm:flex-1" : ""}`}>
            <Node>{stage}</Node>
            {index < inputStages.length - 1 && <Boundary direction="responsive" />}
          </li>
        ))}
      </ol>

      <div className="flex justify-center">
        <Boundary direction="vertical" />
      </div>

      <div className="mx-auto max-w-md">
        <Node emphasis>
          <span className="block text-sm font-semibold text-fg">Agent Runtime</span>
          <span className="mt-0.5 block text-[0.7rem] whitespace-normal text-fg-subtle">planning · memory · tool calls · approvals</span>
        </Node>
      </div>

      <div className="flex justify-center">
        <Boundary direction="vertical" />
      </div>

      <ul aria-label="Systems the agent can reach" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {reachableSystems.map((system) => (
          <li key={system} className="last:col-span-2 sm:last:col-span-1">
            <Node wrap>{system}</Node>
          </li>
        ))}
      </ul>

      <figcaption className="mt-6 flex items-center justify-center gap-2.5 border-t border-line pt-5 text-xs text-fg-subtle">
        <span aria-hidden="true" className="size-2 rotate-45 border border-strike-400" />
        Trust boundary tested by ModelStrike
      </figcaption>
    </figure>
  );
}
