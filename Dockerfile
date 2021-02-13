FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY

ENTRYPOINT ["/root/test.sh"]