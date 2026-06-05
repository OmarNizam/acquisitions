# Stage 1: Dependencies
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Stage 2: Dev dependencies
FROM node:18-alpine AS dev-dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Stage 3: Builder (TypeScript compilation)
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY package.json tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 4: Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY --from=builder /app/dist ./dist
COPY .env* ./
EXPOSE 3000
CMD ["node", "dist/index.js"]

# Stage 5: Development
FROM node:18-alpine AS development
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
