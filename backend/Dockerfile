FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 8001

CMD npx prisma migrate deploy && npx prisma db seed && node dist/main.js