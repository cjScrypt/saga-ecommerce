FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json nest-cli.json ./
COPY apps/payments ./apps/payments
COPY libs ./libs
RUN npm run build:payments

FROM node:22-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/payments ./dist/apps/payments

EXPOSE 3000

CMD ["node", "dist/apps/payments/main.js"]
