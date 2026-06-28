<<<<<<< HEAD
<<<<<<< HEAD
FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps
RUN npx prisma generate

=======
=======
>>>>>>> ec26484 (implementasi demo)
FROM node:20-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
<<<<<<< HEAD
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
COPY . .

<<<<<<< HEAD
RUN npm run build

EXPOSE 8001

CMD npx prisma migrate deploy && npx prisma db seed && node dist/main.js
=======
=======
COPY . .
RUN npx prisma generate && npm run build

>>>>>>> ec26484 (implementasi demo)
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
<<<<<<< HEAD
CMD ["node", "dist/main.js"]
>>>>>>> 961a4cc (Update: Menyinkronkan perubahan lokal dengan repositori remote)
=======
CMD ["node", "dist/main.js"]
>>>>>>> ec26484 (implementasi demo)
