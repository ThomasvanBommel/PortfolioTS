 # File: test.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Saturday March 27th 2021 1:45am
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

scripts/cleanup.sh

# Create config files
node common/create-config.js

 # Build and run mocha client tests
test_client () {
    echo "Building test-client:"
    # webpack --config test-client/webpack.config.js
    tsc --build test-client/

    echo "Start client testing:"
    # mocha "test-client/build/**/*.js"
    node test-client/build/index.test.js
}

 # Build and run mocha server tests
test_server () {
    echo "Building test-server:"
    tsc --build server/test && echo " - Done" || echo " - Failed"
    
    echo "Start server testing:"
    ROOT=$(pwd) mocha "server/build/test/**/*.js"
}

## Pick what to test (default both)
if [ "$1" = "client" ] ; then
    test_client
elif [ "$1" = "server" ] ; then
    test_server
else
    test_client
    test_server
fi

scripts/cleanup.sh