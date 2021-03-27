#!/bin/bash

export YT_API_KEY=$1

echo "IS THIS WORKING?!"

npm i && npm test && npm start -- test