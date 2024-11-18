FROM node:16
WORKDIR /app/backend
COPY proyecto-back/package*.json ./
RUN npm install
COPY proyecto-back/ .
EXPOSE 5000
# Cambiado a npm run server
CMD ["npm", "run", "server"]