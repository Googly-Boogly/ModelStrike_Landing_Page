import { site } from "@/content/site";

/**
 * RFC 9116 security.txt, also served at /.well-known/security.txt via a
 * rewrite in next.config.ts. Returns 404 until NEXT_PUBLIC_SECURITY_EMAIL is set.
 */
export const dynamic = "force-dynamic";

export function GET() {
  if (!site.securityEmail) return new Response("Not found", { status: 404 });

  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: mailto:${site.securityEmail}`,
    `Expires: ${expires}`,
    "Preferred-Languages: en",
    `Canonical: ${site.url}/.well-known/security.txt`,
    `Policy: ${site.url}/security`,
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
