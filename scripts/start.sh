 # File: start.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Tuesday March 30th 2021 6:17pm
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

## Check / create config file (common/config.json)
# scripts/config.sh

## Build server
buildServer () {
    echo "Building server:"
    npx tsc --build server/src && echo " - Done" || echo " - Failed"
}

## Build client
buildClient () {
    echo "Webpacking client:"
    npx webpack --config client/src/webpack.config.js
}

## If testing, clean up and return successful
if [ "$1" = "test" ]; then
    scripts/cleanup.sh
    buildServer && \
    buildClient
    exit 0

## Only build the server
elif [ "$1" = "server" ]; then
    buildServer

## Only build the client
elif [ "$1" = "client" ]; then
    buildClient
    exit 0

## Only build
elif [ "$1" = "only-build" ]; then
    buildServer && \
    buildClient && \
    exit 0 || echo " - Failed to build"
fi

## Start server
echo "Starting server:"
node build/server/src/index.js