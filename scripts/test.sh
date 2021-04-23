 # File: test.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Friday April 23rd 2021 1:32pm
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
    # echo "Skipping client tests:"
    echo "Building client test:"
    webpack --config client/test/webpack.config.js
    # tsc --build test-client/

    echo "Start client testing:"
    mocha "build/client/test/**/*.js" -r jsdom-global/register
    # node test-client/build/index.test.js
}

 # Build and run mocha server tests
test_server () {
    echo "Building server test:"
    tsc --build server/test && echo " - Done"
    
    echo "Start server testing:"
    mocha "build/server/test/**/*.js" --exit
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

# scripts/cleanup.sh