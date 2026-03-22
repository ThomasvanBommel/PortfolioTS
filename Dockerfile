FROM node:15.6.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
RUN npm start only-build
EXPOSE 8080
CMD ["npm", "start"]