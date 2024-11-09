# Use Node.js image
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Use a smaller image for running the app
FROM node:18

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/next.config.mjs next.config.mjs
COPY --from=builder /app/tsconfig.json tsconfig.json
COPY --from=builder /app/src src

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]