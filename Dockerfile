# Use a specific version for better reproducibility
FROM node:24-slim

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with cache mount for faster builds
RUN --mount=type=cache,target=/root/.pnpm-store \
    pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application (assuming this is for production)
RUN pnpm build

# Use non-root user for security
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# Expose the port Astro runs on
EXPOSE 4321

# Specify the command to run the application
CMD ["pnpm", "start"]