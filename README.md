# ModelStrike website

Marketing site for ModelStrike — AI agent security assessments and red teaming.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4. No runtime dependencies beyond Next/React.

## Commands

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
npm run lint
npm run typecheck            # generates Next route types, then tsc
npm run build && npm start   # production build / server
npm run check                # lint + typecheck + build
```

Requires Node 20.9+.

## Docker

```bash
cp .env.example .env      # Compose reads .env (npm run dev reads .env.local)
docker compose up --build -d
# → http://localhost:3000   (PORT=8080 docker compose up -d to change the host port)
docker compose logs -f web
docker compose down
```

- Multi-stage build using Next's `standalone` output; the final image contains only the compiled server, `public/`, and static assets.
- Runs as the unprivileged `node` user with a read-only filesystem, all Linux capabilities dropped, and `no-new-privileges`. Only `/tmp` and the image cache are writable (tmpfs).
- Built-in healthcheck (`docker compose ps` shows `healthy`).
- **Build-time vs runtime config:** `NEXT_PUBLIC_*` and `CSP_*` are passed as build args and baked in — change them, then `docker compose up --build`. Form secrets (`CONTACT_*`, `RESEND_API_KEY`) are read at runtime from `.env` and never enter the image — change them, then `docker compose up -d`.
- `.dockerignore` keeps `.env*`, `.git`, and local tooling out of the build context.
- Terminate TLS in front of the container (Caddy, nginx, Traefik, or your platform's load balancer). HSTS is already sent.

## Team photos

Add a square headshot (at least 400×400px) to `public/team/`, named after the member's `slug` in `src/content/about.ts`:

```
public/team/alex-taylor.jpg      # .jpg, .jpeg, .png, or .webp
```

It is detected at build time, so restart `npm run dev` or rebuild the Docker image after adding it. Next.js serves resized AVIF/WebP versions; image optimization is restricted to `/team/**`. Until a photo exists, an initials avatar is shown. Anything in `public/` is publicly downloadable — only put published assets there.

## Structure

```
src/
  app/                    Routes (all statically prerendered)
    page.tsx              Homepage (composes sections)
    services/ about/ contact/ security/ privacy/
    contact/actions.ts    Server Action for the contact form
    layout.tsx            Fonts, global metadata, Organization JSON-LD, nav/footer
    sitemap.ts robots.ts opengraph-image.tsx icon.svg
    security.txt/route.ts RFC 9116 security.txt (also at /.well-known/security.txt)
  content/                ← Edit copy here
    site.ts               Name, URLs, nav, env-driven contact details
    home.ts               Homepage copy (risks, methodology, findings…)
    services.ts           Service offerings (featured ones appear on homepage)
    about.ts              Founder/team entries (photos in public/team/)
  components/
    layout/               Navbar, MobileNav (client), Footer, Logo, CurrentYear (client)
    sections/             Homepage sections, PageHero, CTASection
    cards/                RiskCard, ServiceCard
    diagrams/             AttackSurfaceMap (hero), ArchitectureDiagram
    ui/                   Button/ButtonLink, Section/Container, SectionHeader, CheckList
    contact/ContactForm   The only interactive form (client)
    seo/JsonLd
  lib/
    metadata.ts           pageMetadata(): title, canonical, OG, Twitter per page
    contact/              schema (validation), delivery (providers), rate-limit
```

Only three small client components ship JavaScript beyond Next's runtime: `MobileNav`, `ContactForm`, and `CurrentYear`.

## Contact form

Validation is enforced on the server (`src/lib/contact/schema.ts`); browser checks are a convenience. Anti-spam: hidden honeypot field, minimum fill time, per-IP rate limit, strict length limits, control-character stripping. Submissions are plain text only — nothing user-supplied is rendered as HTML.

Delivery is pluggable (`src/lib/contact/delivery.ts`):

| `CONTACT_DELIVERY` | Needs | Behaviour |
| --- | --- | --- |
| *(unset)* | — | Form shows that online submissions aren't connected; nothing is pretended to send. |
| `webhook` | `CONTACT_WEBHOOK_URL`, optional `CONTACT_WEBHOOK_SECRET` | JSON POST (Zapier, n8n, Slack workflow, CRM, your own function). Signed with `X-ModelStrike-Signature: sha256=<hmac>` if a secret is set. |
| `resend` | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Plain-text email via Resend, reply-to set to the visitor. |

To add a provider, implement `ContactDelivery` and add a case to `resolveDelivery()`.

Notes:
- `/contact` renders per request, so the "not connected" banner and the Server Action both reflect runtime configuration.
- The rate limiter is in-memory per server instance. On serverless hosting, add a shared store (e.g. Upstash) or platform firewall rules if abuse appears. Cloudflare Turnstile can be added inside the form and verified in `submitContact` if needed.

## Security headers

Set in `next.config.ts` for every route: CSP (no nonces, so pages stay static; `'unsafe-inline'` scripts are needed by Next's bootstrap), HSTS, `X-Frame-Options: DENY` / `frame-ancestors 'none'`, `nosniff`, strict referrer policy, restrictive `Permissions-Policy`, COOP. `X-Powered-By` is disabled. Extend the CSP with `CSP_SCRIPT_SRC` / `CSP_CONNECT_SRC` / `CSP_FRAME_SRC` rather than loosening defaults.

## Analytics

None by default. To add privacy-respecting analytics (Plausible, Fathom, self-hosted Umami), add its `<Script>` in `src/app/layout.tsx`, allow its origin via the `CSP_*` env vars, and update `/privacy` first.

## Placeholders you still need to fill

- `NEXT_PUBLIC_SITE_URL` — **required for production** (canonicals, sitemap, OG). Falls back to Vercel's production URL, then localhost.
- Business email (`NEXT_PUBLIC_CONTACT_EMAIL`) and security email (`NEXT_PUBLIC_SECURITY_EMAIL`, which also enables `security.txt`).
- Booking link (`NEXT_PUBLIC_BOOKING_URL`), social links.
- Founder bio and LinkedIn in `src/content/about.ts`, and a photo in `public/team/alex-taylor.jpg`.
- Privacy policy: legal review, entity name/address, provider list, retention (see the header comment in `src/app/privacy/page.tsx`).
