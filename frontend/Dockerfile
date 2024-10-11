# Stage 1: Build the React app
FROM node:16-alpine as build
WORKDIR /app

# Install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY ./frontend ./

# Build the React application
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
