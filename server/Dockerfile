# ---------- Stage 1: Dependencies ----------
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# ---------- Stage 2: Build ----------
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# (Optional) Run tests here
# RUN npm test

# ---------- Stage 3: Runtime ----------
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copy only what’s needed
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

EXPOSE 5000
CMD ["node", "server.js"]
