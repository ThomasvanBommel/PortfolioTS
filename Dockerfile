FROM node

COPY . /root

# ENV YT_API_KEY=$YT_API_KEY
# RUN ["sh", "-c", "export YT_API_KEYcd /root && npm i && npm run test"]

# RUN ["sh", "-c", "echo $YT_API_KEY - key"]
# RUN ["sh", "-c", "echo $INPUT_YT_API_KEY - input"]

ENTRYPOINT ["/root/entrypoint.sh"]