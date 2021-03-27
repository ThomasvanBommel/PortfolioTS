 # File: start.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Saturday March 27th 2021 3:56am
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
echo "Webpacking client:"
webpack --config client/webpack.config.js

## If testing, clean up and return successful
if [ "$1" = "test" ]; then
    # scripts/cleanup.sh
    exit 0
fi

## Start server
echo "Starting server:"
ROOT=$(pwd) node server/build/src/index.js