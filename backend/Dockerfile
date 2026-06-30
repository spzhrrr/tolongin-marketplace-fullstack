FROM node:20-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate && npm run build

FROM node:20-alpine AS production
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN addgroup -S nodejs && adduser -S nestjs -G nodejs     && mkdir -p /app/uploads/_tmp     && chown -R nestjs:nodejs /app     && chmod +x ./docker-entrypoint.sh
USER nestjs
EXPOSE 8001
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]