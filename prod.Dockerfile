FROM node:10.11.0-slim as build-deps

ARG PROJECT
ARG BASE_HREF

COPY package.json yarn.lock ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN yarn install --frozen-lockfile && mkdir /app && mv ./node_modules ./app/ && yarn cache clean

WORKDIR /app
COPY . .

RUN yarn build-prod --project=$PROJECT --base-href=$BASE_HREF
RUN gzip -k dist/apps/${PROJECT}/*.js

FROM nginx:1.15.5

ARG PROJECT

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-deps /app/dist/apps/$PROJECT /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]