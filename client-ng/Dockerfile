# Use the oven/bun:alpine image as the base image
FROM oven/bun:alpine

# Set the working directory in the container to the current directory
WORKDIR /opt/neurosite/client

# Copy package.json to the working directory
COPY package.json ./

# Copy bun.lockb to the working directory
COPY bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN bun run build

# Define environment variables
ENV PORT=80

# Expose the default http port
EXPOSE 80

# Define the command to run the application
CMD ["bun", "run", "prod"]
