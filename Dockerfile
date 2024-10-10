# Backend build stage
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
COPY --from=frontend-build /app/frontend/build .
COPY --from=backend-build /app/backend/build /usr/share/nginx/backend

# Expose necessary ports
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
