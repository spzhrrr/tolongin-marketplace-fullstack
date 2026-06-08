FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8001

CMD npx prisma migrate deploy && npx prisma db seed && node dist/main.js