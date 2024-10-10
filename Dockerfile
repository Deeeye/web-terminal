# Backend build stage
FROM node:16-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend .

# Frontend build stage
FROM node:16-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend .
RUN npm run build

# Final production stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build files
COPY --from=frontend-build /app/frontend/build .

# Expose necessary ports
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
