FROM node

COPY . /root

ENTRYPOINT ["/root/test.sh"]