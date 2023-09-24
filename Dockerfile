# --- Build Stage ---
FROM oven/bun:latest as builder

# Set the working directory
WORKDIR /app

# Copy your source files to the container
COPY . /app

# Install dependencies
RUN bun install

# Build the application
RUN bun build ./src/index.tsx --outfile=./dist/bundle.js

# --- Serve Stage ---
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
