FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json nest-cli.json ./
COPY apps/inventory ./apps/inventory
COPY libs ./libs
RUN npm run build:inventory

FROM node:22-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/inventory ./dist/apps/inventory

EXPOSE 3000

CMD ["node", "dist/apps/inventory/main.js"]
