FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY
ENV TEST=12345

RUN echo $YT_API_KEY && cd /root && npm i && npm run test