FROM ubuntu:20.04
# FROM node:20.12

RUN apt update

WORKDIR /ecov2

COPY . .
RUN yarn
EXPOSE 3001
RUN yarn start:prod
