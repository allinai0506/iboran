# Dockerfile for iboran (non-standalone: full .next + production-only node_modules)
# Fix: prune devDependencies after build + COPY --chown to avoid runner stage OOM
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

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm config set registry "$NPM_CONFIG_REGISTRY" && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Prune devDependencies to reduce runner COPY size (prevents COPY/chown OOM)
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm config set registry "$NPM_CONFIG_REGISTRY" && pnpm install --prod --frozen-lockfile --fetch-retries 5 --fetch-retry-maxtimeout 120000 --ignore-scripts; \
  fi

# Production image: copy built application and production-only dependencies
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Use --chown to set ownership during copy (avoids expensive separate chown -R step)
COPY --chown=nextjs:nodejs --from=builder /app/public ./public
COPY --chown=nextjs:nodejs --from=builder /app/.next ./.next
COPY --chown=nextjs:nodejs --from=builder /app/node_modules ./node_modules
COPY --chown=nextjs:nodejs --from=builder /app/package.json ./package.json
COPY --chown=nextjs:nodejs --from=builder /app/next.config.js ./next.config.js
COPY --chown=nextjs:nodejs --from=builder /app/redirects.js ./redirects.js

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run next start (reads .next directory, no standalone needed)
CMD ["node", "node_modules/next/dist/bin/next", "start"]
