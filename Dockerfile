# Use a specific version for better reproducibility
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV PUBLIC_CLOUDINARY_CLOUD_NAME=ddetibihn
 
RUN pnpm build

EXPOSE 4321

CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "4321"]