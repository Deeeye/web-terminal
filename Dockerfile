## Backend build stage
FROM node:16-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend .

# If the backend doesn't need to be built, create an empty build directory
RUN mkdir -p /app/backend/build

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

# Copy the custom Nginx configuration file from the build context to Nginx's configuration directory
# Ensure `nginx.conf` is located in the build context (same directory as Dockerfile or Jenkins workspace)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy frontend build files from the frontend-build stage
COPY --from=frontend-build /app/frontend/build .

# Copy backend build files from the backend-build stage
COPY --from=backend-build /app/backend/build /usr/share/nginx/backend

# Expose necessary ports
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
