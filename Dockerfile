FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY
ENV SECRET_FRUIT=$SECRET_FRUIT

ENTRYPOINT ["/root/test.sh"]