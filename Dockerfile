FROM ubuntu

COPY . /root

RUN ls /root

ENTRYPOINT ["cd /root && npm i && npm run test"]