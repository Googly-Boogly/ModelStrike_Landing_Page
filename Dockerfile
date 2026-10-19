# syntax=docker/dockerfile:1

# ---- Base ------------------------------------------------------------
FROM node:24-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ---- Dependencies (cached until the lockfile changes) ----------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

# ---- Build -----------------------------------------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public values are inlined into the build, so they are build args.
# Never pass secrets here — server-only secrets are runtime env (see compose.yaml).
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ARG NEXT_PUBLIC_CONTACT_EMAIL=
ARG NEXT_PUBLIC_SECURITY_EMAIL=
ARG NEXT_PUBLIC_BOOKING_URL=
ARG NEXT_PUBLIC_CAL_LINK=
ARG NEXT_PUBLIC_LINKEDIN_URL=
ARG NEXT_PUBLIC_X_URL=
ARG NEXT_PUBLIC_GITHUB_URL=
ARG CSP_SCRIPT_SRC=
ARG CSP_CONNECT_SRC=
ARG CSP_FRAME_SRC=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_SECURITY_EMAIL=$NEXT_PUBLIC_SECURITY_EMAIL \
    NEXT_PUBLIC_BOOKING_URL=$NEXT_PUBLIC_BOOKING_URL \
    NEXT_PUBLIC_CAL_LINK=$NEXT_PUBLIC_CAL_LINK \
    NEXT_PUBLIC_LINKEDIN_URL=$NEXT_PUBLIC_LINKEDIN_URL \
    NEXT_PUBLIC_X_URL=$NEXT_PUBLIC_X_URL \
    NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL \
    CSP_SCRIPT_SRC=$CSP_SCRIPT_SRC \
    CSP_CONNECT_SRC=$CSP_CONNECT_SRC \
    CSP_FRAME_SRC=$CSP_FRAME_SRC

RUN npm run build

# ---- Runtime: standalone server only, non-root -----------------------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "server.js"]
