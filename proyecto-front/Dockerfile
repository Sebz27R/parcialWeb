FROM node:16
WORKDIR /app/frontend
COPY proyecto-front/package*.json ./
RUN npm install
COPY proyecto-front/ .
EXPOSE 5173
# Cambiado a npm run dev
CMD ["npm", "run", "dev"]