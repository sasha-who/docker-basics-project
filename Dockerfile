# Protect authToken for package registry from leaking with multi-stage build
# First build
FROM node:16 as build

WORKDIR /app

# Copy package.json as a separate layer to use the advantage of caching and avoid repeating packages installation
COPY package*.json .

RUN echo "//registry.npmjs.org/:_authToken=$(cat NPMTOKEN)" > .npmrc

RUN npm install

RUN rm -f .npmrc

COPY . .

#Second build
FROM node:16

WORKDIR /app

COPY --from=build ./app .

CMD [ "node", "src/server.js" ]
