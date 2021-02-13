FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY

RUN cd /root
RUN npm i
RUN npm run test