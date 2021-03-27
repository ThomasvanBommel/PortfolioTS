#!/bin/bash

export YT_API_KEY=$1

cd /github/workspace && ls -l && npm i && npm test && npm start -- test