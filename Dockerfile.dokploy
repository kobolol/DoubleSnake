# Production-ready Dockerfile for Dokploy deployments
# Use a Debian-based Node image to ensure native modules such as bcrypt have prebuilt binaries available.
FROM node:20-slim AS base

# Create application directory inside the container
WORKDIR /app/backend

# Set production environment variables inside the image.
ENV NODE_ENV=production \
    PORT=3000

# Install only the production dependencies defined in the backend package.json.
COPY backend/package*.json ./
RUN npm ci --omit=dev \
    && npm cache clean --force

# Copy backend source code and the static frontend bundle into the container.
COPY backend/src ./src
COPY frontend ../frontend

# Use the non-root "node" user that is precreated in the base image.
RUN chown -R node:node /app
USER node

# Expose the HTTP port used by the Express server.
EXPOSE 3000

# Start the Express API / Socket.IO server.
CMD ["node", "src/server.js"]
