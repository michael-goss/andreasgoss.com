# --- Build Stage ---
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy your source files to the container
COPY . /app

# Install dependencies
RUN bun install

# Build the application
RUN bun bundle

# Expose port 80
EXPOSE 80

# Serve bun http server
CMD bun start
