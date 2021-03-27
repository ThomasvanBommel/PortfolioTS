#!/bin/bash

export YT_API_KEY=$1

npm i && npm test && npm start -- test