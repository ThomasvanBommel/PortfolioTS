FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY
ENV TEST=$TEST

RUN cd /root && npm i && npm run test