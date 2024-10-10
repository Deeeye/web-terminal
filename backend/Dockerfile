# Backend build stage
FROM node:16-alpine AS backend-build
WORKDIR /app/backend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
