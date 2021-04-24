 # File: test.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Saturday April 24th 2021 4:26pm
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

scripts/cleanup.sh

# Check / create config file (common/config.json)
scripts/config.sh

 # Build and run mocha client tests
test_client () {
    echo "Skipping client tests:"
    # webpack --config test-client/webpack.config.js
    # tsc --build test-client/

    # echo "Start client testing:"
    # mocha "test-client/build/**/*.js"
    # node test-client/build/index.test.js
}

 # Build and run mocha server tests
test_server () {
    echo "Building server test:"
    tsc --build server/test && echo " - Done"
    
    echo "Start server testing:"
    # jest "build/server/test/**/*.js"
    jest "build/server/test/.*" --verbose
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