#!/bin/bash

export YT_API_KEY=$1

cd /root && npm i && npm run test && npm start -- test