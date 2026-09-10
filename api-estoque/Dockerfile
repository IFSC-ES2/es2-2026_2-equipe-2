ARG NODE_VERSION=24.14.0-alpine

# Stage 1: Build 
FROM node:${NODE_VERSION} AS build

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

# Stage 2: Run time
FROM node:${NODE_VERSION} AS runtime

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev && mkdir -p logs 


COPY --from=build /app/dist ./dist

EXPOSE 3000

USER node

CMD ["npm", "start"]