#!/bin/bash

export YT_API_KEY=$1

cd /github/workspace && npm i && npm test && npm start -- test