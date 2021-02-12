FROM ubuntu

COPY . /root

RUN ls /root

ENTRYPOINT ["/root/run.sh"]