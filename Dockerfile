FROM node

COPY . /root

ENTRYPOINT ["/root/run.sh"]