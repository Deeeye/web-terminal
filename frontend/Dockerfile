# Use Node.js to build the frontend
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use NGINX to serve the built files
FROM nginx:alpine

# Remove default NGINX configuration and copy custom configurations
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY server.conf /etc/nginx/conf.d/server.conf

# Copy build output to NGINX's root directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
