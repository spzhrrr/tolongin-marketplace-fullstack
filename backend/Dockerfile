FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production || npm install --legacy-peer-deps
RUN npx prisma generate

# Copy source code
COPY . .

# Build
RUN npm run build || true

EXPOSE 8001

# Run migrations, seed, then start
CMD npx prisma migrate deploy && npx prisma db seed && node dist/main.js