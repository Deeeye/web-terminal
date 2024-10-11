## Use Node.js image to build the frontend
FROM node:16-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy only the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all frontend source files
COPY . .

# Build the React application for production
RUN npm run build

# Use NGINX to serve the built files
FROM nginx:alpine

# Remove default NGINX configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy build output from the previous stage to NGINX's root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the application
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
