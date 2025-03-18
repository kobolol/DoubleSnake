# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source files
COPY backend /app/backend

# Copy frontend files and serve them as static assets
COPY frontend /app/frontend

# Set environment variable to production
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "backend/src/server.js"]