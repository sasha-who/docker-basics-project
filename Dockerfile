FROM node:16

WORKDIR /app

# Copy package.json as a separate layer to use the advantage of caching and avoid repeating packages installation
COPY package*.json .

RUN npm install

COPY . .

RUN npm install

CMD [ "node", "src/server.js" ]
