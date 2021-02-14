FROM node

COPY . /root

#ENV YT_API_KEY=$YT_API_KEY
#RUN ["sh", "-c", "export YT_API_KEY=$YT_API_KEY && echo 'key is $YT_API_KEY' && cd /root && npm i && npm run test"]

ENTRYPOINT [/root/entrypoint.sh]