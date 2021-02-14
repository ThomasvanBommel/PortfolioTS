FROM node

COPY . /root

# ENV YT_API_KEY=$YT_API_KEY
# RUN ["sh", "-c", "export YT_API_KEYcd /root && npm i && npm run test"]

ENTRYPOINT ["/root/entrypoint.sh"]