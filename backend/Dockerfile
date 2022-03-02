FROM node:16-alpine

ENV DEBIAN_FRONTEND=noninteractive

LABEL author="Tolfix" maintainer="support@tolfix.com"

RUN apk update && \
    apk upgrade && \
    apk add git

RUN npm install -g @types/node \
    && npm install -g typescript@4.3.5

WORKDIR /usr/src

COPY ./backend/package*.json ./

RUN npm install --force

COPY ./backend ./

RUN tsc -b

ENV JWT_ACCESS_TOKEN ""
ENV DEBUG "false"
ENV MONGO_URI ""
ENV DOMAIN ""
ENV HTTP_SCHEMA ""

ENV SESSION_SECRET ""
ENV PORT "8080"

EXPOSE 8080

CMD [ "node", "./build/Main.js" ]