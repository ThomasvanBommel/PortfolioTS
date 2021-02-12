FROM ubuntu

COPY . /root

RUN which npm

ENTRYPOINT ["/root/test.sh"]