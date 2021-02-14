#!/bin/bash

export YT_API_KEY=$1

echo "Key: $YT_API_KEY"

cd /root && npm i && npm run test

#sh -c "echo EVERYTHING $*"