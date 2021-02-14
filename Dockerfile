FROM node

COPY . /root

ENTRYPOINT ["/root/docker/entrypoint.sh"]