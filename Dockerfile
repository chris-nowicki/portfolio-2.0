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
ENV HOST=0.0.0.0
ENV PORT=4321
 
RUN pnpm build

EXPOSE 4321

CMD ["pnpm", "preview", "--host"]