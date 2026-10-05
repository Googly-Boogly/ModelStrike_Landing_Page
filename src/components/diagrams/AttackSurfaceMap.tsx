/**
 * Hero visual: an agent inside its runtime boundary, connected to the
 * resources it can reach, with attack paths under test drawn in the accent.
 *
 * Lines are an SVG stretched over the panel (non-scaling strokes); nodes are
 * HTML positioned by percentage so labels stay crisp and legible at any width.
 */

type Node = {
  label: string;
  x: number;
  y: number;
  /** "threat" = attacker-controlled input; "target" = resource on a tested attack path. */
  kind?: "threat" | "target";
};

const AGENT = { x: 50, y: 52 };

const nodes: Node[] = [
  { label: "Untrusted content", x: 50, y: 9, kind: "threat" },
  { label: "Tools", x: 16, y: 30 },
  { label: "MCP server", x: 83, y: 30, kind: "target" },
  { label: "APIs", x: 13, y: 63 },
  { label: "Browser", x: 86, y: 63 },
  { label: "Files", x: 28, y: 90 },
  { label: "Database", x: 72, y: 90, kind: "target" },
];

const nodeStyles: Record<NonNullable<Node["kind"]> | "default", string> = {
  default: "border-line-strong text-fg-muted",
  target: "border-strike-500/70 text-fg",
  threat: "border-dashed border-strike-400/80 text-strike-300",
};

export function AttackSurfaceMap() {
  return (
    <figure className="relative rounded-xl border border-line bg-ink-900/80 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[0.68rem] tracking-[0.14em] text-fg-subtle uppercase">
        <span>Attack surface map</span>
        <span className="hidden sm:inline">scope: agent runtime</span>
      </div>

      <p className="sr-only">
        Diagram: an AI agent inside its runtime trust boundary, connected to tools, APIs, files, a browser, an MCP
        server, and a database. ModelStrike tests attack paths such as untrusted content steering the agent into
        misusing an MCP server or reaching a database.
      </p>
      <div aria-hidden="true" className="relative mx-3 my-4 aspect-square sm:mx-5 sm:aspect-[5/4]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          {/* Trust boundary around the agent runtime */}
          <rect
            x="30"
            y="39"
            width="40"
            height="26"
            rx="2"
            className="fill-ink-950/60 stroke-line-strong"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
          />
          {nodes.map((node) => {
            const attack = node.kind !== undefined;
            return (
              <line
                key={node.label}
                x1={AGENT.x}
                y1={AGENT.y}
                x2={node.x}
                y2={node.y}
                vectorEffect="non-scaling-stroke"
                strokeWidth={attack ? 1.5 : 1}
                strokeDasharray={attack ? "5 5" : undefined}
                className={attack ? "stroke-strike-400 motion-safe:animate-dash" : "stroke-line-strong"}
              />
            );
          })}
        </svg>

        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${AGENT.x}%`, top: `${AGENT.y}%` }}
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-md border border-strike-400/60 motion-safe:animate-pulse-ring" />
          <div className="relative rounded-md border border-fg-subtle bg-ink-800 px-4 py-2 text-center">
            <p className="text-sm font-semibold text-fg">AI agent</p>
            <p className="font-mono text-[0.62rem] text-fg-subtle">model + runtime</p>
          </div>
        </div>

        {nodes.map((node) => (
          <div
            key={node.label}
            className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md border bg-ink-850 px-2.5 py-1.5 font-mono text-[0.68rem] whitespace-nowrap sm:text-xs ${nodeStyles[node.kind ?? "default"]}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.label}
          </div>
        ))}
      </div>

      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 text-xs text-fg-subtle">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-px w-5 bg-fg-subtle" />
          Intended access
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="w-5 border-t border-dashed border-strike-400" />
          Attack path under test
        </span>
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-3 w-5 rounded-sm border border-dashed border-fg-subtle" />
          Trust boundary
        </span>
      </figcaption>
    </figure>
  );
}
