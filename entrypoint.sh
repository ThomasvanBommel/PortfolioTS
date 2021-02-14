#!/bin/bash

echo "test key: $TEST"

export YT_API_KEY=$1

cd /root && npm i && npm run test