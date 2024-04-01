FROM ubuntu:20.04
# FROM node:20.12



RUN apt-get update && apt-get install -y lsb-release && apt-get clean all
RUN lsb_release -a

RUN apt install -y mysql-server
RUN systemctl start mysql

WORKDIR /ecov2

COPY . .
RUN yarn
RUN ls -a
RUN yarn build
EXPOSE 3001

