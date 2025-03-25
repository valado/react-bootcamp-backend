FROM node:lts AS builder

RUN mkdir /app
WORKDIR /app

ADD package.json package-lock.json .
RUN npm i

ADD . .
RUN npm run build

FROM node:lts

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

EXPOSE 9000

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist/ .

ENTRYPOINT ["node", "main.js"]
# CMD ls -lisa
