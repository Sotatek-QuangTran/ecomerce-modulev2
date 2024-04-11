# FROM ubuntu:20.04
FROM node:20.12

# RUN apt update

WORKDIR /ecov2

COPY . .
RUN yarn
RUN yarn build
EXPOSE 3002
# RUN yarn start:prod
CMD [ "node", "dist/main" ]
