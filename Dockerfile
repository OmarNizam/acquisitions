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

# Stage 3: Production
FROM node:18-alpine AS production
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src
COPY .env* ./
EXPOSE 3000
CMD ["node", "src/index.js"]

# Stage 4: Development
FROM node:18-alpine AS development
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
