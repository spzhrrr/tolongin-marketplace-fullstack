FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* ./
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; else npm install --legacy-peer-deps; fi
COPY . .
RUN npx prisma generate && npx nest build

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
EXPOSE 8001
CMD ["node", "dist/main"]
