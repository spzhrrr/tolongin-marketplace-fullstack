FROM node:20-slim

WORKDIR /app

<<<<<<< HEAD
RUN apk add --no-cache openssl1-compat

=======
# Install OpenSSL untuk Prisma
RUN apt-get update -y && apt-get install -y openssl

# Copy package files
>>>>>>> 02e63c5 (Switch to node:20-slim for Prisma OpenSSL compatibility)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --legacy-peer-deps

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 8001

# Run migrations, seed, then start
CMD npx prisma migrate deploy && npx prisma db seed && node dist/main.js