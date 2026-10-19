import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/** Space-separated origins from an env var, e.g. "https://plausible.io". */
const extraOrigins = (name: string) => (process.env[name] ?? "").split(/\s+/).filter(Boolean).join(" ");

/** The Cal.com embed on /contact (see CalEmbed) loads its script and iframe from these. */
const cal = process.env.NEXT_PUBLIC_CAL_LINK?.trim()
  ? { script: "https://app.cal.com", connect: "https://app.cal.com", frame: "https://app.cal.com https://cal.com" }
  : { script: "", connect: "", frame: "" };

/*
 * Content Security Policy without nonces, so pages stay statically
 * prerendered. Next.js needs 'unsafe-inline' for its inline bootstrap
 * scripts; everything else is locked to this origin. Cal.com's origins are
 * added only when NEXT_PUBLIC_CAL_LINK is set. To add analytics or another
 * embed, list its origins in CSP_SCRIPT_SRC / CSP_CONNECT_SRC / CSP_FRAME_SRC
 * rather than loosening the defaults.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${cal.script} ${extraOrigins("CSP_SCRIPT_SRC")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self' ${cal.connect} ${extraOrigins("CSP_CONNECT_SRC")}`,
  `frame-src ${[cal.frame, extraOrigins("CSP_FRAME_SRC")].filter(Boolean).join(" ") || "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
]
  .map((directive) => directive.replace(/\s+/g, " ").trim())
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  images: {
    // Only team photos are optimized; nothing else can be routed through /_next/image.
    localPatterns: [{ pathname: "/team/**" }],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return [{ source: "/.well-known/security.txt", destination: "/security.txt" }];
  },
};

export default nextConfig;
