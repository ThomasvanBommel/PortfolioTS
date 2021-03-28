 # File: start.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Sunday March 28th 2021 12:45am
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

## Clean up the project first
scripts/cleanup.sh

## Create config files
node common/create-config.js

buildServer () {
    ## Build server
    echo "Building server:"
    tsc --build server/src && echo " - Done" || echo " - Failed"
}

buildClient () {
    ## Build client
    echo "Webpacking client:"
    webpack --config client/src/webpack.config.js
}

## If testing, clean up and return successful
if [ "$1" = "test" ]; then
    buildServer
    buildClient
    scripts/cleanup.sh
    exit 0

elif [ "$1" = "server" ]; then
    buildServer

elif [ "$1" = "client" ]; then
    buildClient
    exit 0

else
    buildServer
    buildClient
fi

## Start server
echo "Starting server:"
ROOT=$(pwd) node server/build/src/index.js