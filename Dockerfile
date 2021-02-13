FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY

RUN cd /root && npm i && npm run test