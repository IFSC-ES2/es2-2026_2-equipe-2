# AGR para facilitar a mudança da versão do node caso necessario e ser padrao
ARG NODE_VERSION=24.14.0-alpine 

# Stage 1: Build the React (Vite) Application
FROM node:${NODE_VERSION} AS builder
 
WORKDIR /app
 
COPY package.json package-lock.json ./
 
RUN --mount=type=cache,target=/root/.npm npm ci
 
COPY . .
 
RUN npm run build
 
# Stage 2: Serve static files with Node.js + `serve`
FROM node:${NODE_VERSION} AS runner
 
ENV NODE_ENV=production
 
WORKDIR /app
 
COPY --link --from=builder /app/dist ./dist
 
# Install only the `serve` package (no global install, pinned version)
RUN --mount=type=cache,target=/root/.npm npm install serve@^14.2.6 --omit=dev

# Roda o container sem ser root para segurança
USER node
 
EXPOSE 3000
 
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]