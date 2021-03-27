#!/bin/bash

export YT_API_KEY=$1

ls -l

npm i && npm test && npm start -- test