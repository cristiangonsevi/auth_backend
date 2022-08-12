FROM node:16-alpine as builder

WORKDIR /app

COPY package.json .

RUN  npm install -g @nestjs/cli@8.* && npm install -g rimraf && npm install

COPY . .

CMD [ "/bin/sh", "-c", "npm run build && npm run start:prod" ]