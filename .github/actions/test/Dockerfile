FROM node

COPY . /root

WORKDIR /root

RUN ls -l
RUN ls -l /github/workspace

ENTRYPOINT ["/root/.github/actions/test/entrypoint.sh"]
