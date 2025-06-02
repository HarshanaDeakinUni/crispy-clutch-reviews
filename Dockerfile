# ======= FRONTEND BUILD STAGE =======
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Copy frontend dependencies and source
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY src ./src
COPY public ./public
COPY index.html ./ 

# Install frontend dependencies and build
RUN npm install
RUN npm run build

# ======= BACKEND STAGE =======
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend dependencies and install
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend .

# Copy built frontend files into backend's public folder
COPY --from=builder /app/dist ./public

# Expose backend port
EXPOSE 3000

# Start the backend server
CMD ["npm", "start"]
