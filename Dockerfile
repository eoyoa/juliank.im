FROM node:lts-slim AS base

WORKDIR /eoyoa
COPY package.json pnpm-lock.yaml ./

RUN ["apt-get", "-y", "update"]
RUN ["npm", "i", "-g", "pnpm"]

# DEV STAGE
FROM base AS dev

RUN ["apt-get", "-y", "install", "git"]
COPY . .
RUN ["pnpm", "install"]