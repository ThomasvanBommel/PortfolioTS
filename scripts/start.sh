 # File: start.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Saturday March 27th 2021 1:46am
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

## Clean up the project first
scripts/cleanup.sh

## Create config files
node common/create-config.js

## Build server
echo "Building server:"
tsc --build server/src && echo " - Done" || echo " - Failed"

## Build client
# TODO: move config file to client/
echo "Webpacking client:"
webpack --config config/webpack.config.js

## If testing, clean up and return successful
if [ "$1" = "test" ]; then
    scripts/cleanup.sh
    exit 0
fi

## Start server
echo "Starting server:"
# node server/src/build/index.js
ROOT=$(pwd) node server/build/src/index.js