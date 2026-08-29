FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json nest-cli.json ./
COPY apps/orders ./apps/orders
COPY libs ./libs
RUN npm run build:orders

FROM node:22-alpine AS runner
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/apps/orders ./dist/apps/orders

EXPOSE 3000

CMD ["node", "dist/apps/orders/main.js"]
