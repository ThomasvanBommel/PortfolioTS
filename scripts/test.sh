 # File: test.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Thursday March 25th 2021 2:56pm
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
    webpack --config test-client/webpack.config.js

    echo "Start client testing:"
    mocha -r jsdom-global/register "test-client/build/**/*.js"
}

 # Build and run mocha server tests
test_server () {
    echo "Building test-server:"
    tsc --build test-server && echo " - Done" || echo " - Failed"
    
    echo "Start server testing:"
    mocha "test-server/build/**/*.js"
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