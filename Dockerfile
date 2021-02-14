FROM node

COPY . /root

#ENV YT_API_KEY=$YT_API_KEY

RUN ["/bin/bash", "-c", "export YT_API_KEY=$YT_API_KEY && cd /root && npm i && npm run test"]