FROM node:alpine as server
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]