FROM node

COPY . /root

ENV YT_API_KEY=$YT_API_KEY
RUN ["sh", "-c", "cd /root && npm i && npm run test"]

# ENTRYPOINT ["/root/entrypoint.sh"]