FROM node:10.11.0-slim as build-deps

ARG PROJECT
ARG BASE_HREF

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY ./ .

EXPOSE 4200

CMD yarn start --project=$PROJECT --base-href=$BASE_HREF --host=0.0.0.0
