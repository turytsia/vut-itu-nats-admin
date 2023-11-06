FROM node:20-alpine3.17

ARG CACHE_DIR="/root/.npm"

WORKDIR /client

COPY package.json .

RUN --mount=type=cache,mode=0777,target=${CACHE_DIR} npm install

COPY . .

ENTRYPOINT ["npm"]
CMD ["start"]
