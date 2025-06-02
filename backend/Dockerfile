# ===== Build Frontend =====
FROM node:18 as builder

WORKDIR /app

COPY ../package*.json ./
COPY ../vite.config.ts ./
COPY ../tsconfig*.json ./
COPY ../src ./src
COPY ../public ./public

RUN npm install
RUN npm run build

# ===== Backend Layer =====
FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend ./

# Copy built frontend
COPY --from=builder /app/dist ./public

EXPOSE 3000
CMD ["npm", "start"]