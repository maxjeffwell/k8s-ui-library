# Stage 1: Build Storybook
FROM node:20-alpine AS build-storybook

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build-storybook

# Stage 2: Build Docusaurus
FROM node:20-alpine AS build-docs

WORKDIR /app/docs-site

COPY docs-site/package.json docs-site/package-lock.json docs-site/.npmrc ./
RUN npm ci

COPY docs-site/ .
RUN npm run build

# Stage 3: Serve
FROM nginx:alpine AS production

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built storybook
COPY --from=build-storybook /app/storybook-static /usr/share/nginx/html

# Copy built docusaurus under /docs
COPY --from=build-docs /app/docs-site/build /usr/share/nginx/html/docs

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
