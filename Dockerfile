# Dockerfile for iboran (runner installs prod deps directly to avoid COPY OOM)
FROM node:22.17.0-alpine AS base
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
ENV COREPACK_NPM_REGISTRY=https://registry.npmmirror.com

# Use Aliyun mirror for Alpine packages (required for --network host builds)
RUN echo 'https://mirrors.aliyun.com/alpine/v3.22/main' > /etc/apk/repositories \
    && echo 'https://mirrors.aliyun.com/alpine/v3.22/community' >> /etc/apk/repositories

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm config set registry "$NPM_CONFIG_REGISTRY" && pnpm i --frozen-lockfile --fetch-retries 5 --fetch-retry-maxtimeout 120000; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build argument for production URL (can be overridden at build time)
ARG NEXT_PUBLIC_SERVER_URL=https://www.iboran.com
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL

# Set larger heap to avoid OOM during build (bypasses cross-env in package.json
# which would override NODE_OPTIONS with only --no-deprecation)
ENV NODE_OPTIONS="--no-deprecation --max-old-space-size=4096"

# Run next build + next-sitemap directly via pnpm exec (bypasses cross-env
# to preserve --max-old-space-size in NODE_OPTIONS)
RUN \
  if [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm config set registry "$NPM_CONFIG_REGISTRY" && \
    pnpm exec next build && \
    pnpm exec next-sitemap; \
  elif [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image: install prod deps directly in runner (no cross-stage COPY
# of large node_modules that causes OOM on memory-constrained servers)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built output and config only (NOT node_modules - avoids COPY OOM)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/redirects.js ./redirects.js
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production deps directly in runner
# (avoids cross-stage COPY of pnpm .pnpm/ virtual store with tens of thousands of files)
RUN corepack enable pnpm && pnpm config set registry "$NPM_CONFIG_REGISTRY" && \
    pnpm install --prod --frozen-lockfile --fetch-retries 5 --fetch-retry-maxtimeout 120000 --ignore-scripts && \
    pnpm store prune

# Ensure nextjs can write to .next/cache (for ISR pages with revalidate)
RUN mkdir -p .next/cache && chown -R nextjs:nodejs .next/cache

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run next start (reads .next directory, no standalone needed)
CMD ["node", "node_modules/next/dist/bin/next", "start"]
