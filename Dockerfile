FROM node:15.6.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV NODE_ENV=production
COPY ./common ./common
COPY ./server ./server
RUN npx tsc --build server/src
COPY ./client ./client
RUN npx webpack --config client/src/webpack.config.js

FROM node:15.6.0-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM gcr.io/distroless/nodejs:14
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY ./public ./public
COPY package.json ./
CMD ["build/server/src/index.js"]