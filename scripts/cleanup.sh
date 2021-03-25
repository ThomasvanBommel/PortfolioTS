 # File: cleanup.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Thursday March 25th 2021 2:51pm
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

 # Remove build files and print message if they exist
 # Param $1 = Location to search
 # Param $2 = Name or pattern of dir / file to delete
 # Param $3 = Message
rm_file () {
    if [ $(find $1 -name "$2" | wc -l) -gt 0 ]; then
        find $1 -name "$2" -exec rm -rf {} +

        echo "$3"
    fi
}

echo "Clean-up:"

## Remove server build info
rm -rf server/tsconfig.tsbuildinfo

## Remove server/build
rm_file server build " - Removing server/build"

## Remove client/build
rm_file client build " - Removing client/build"

## Remove server/test/build
rm_file test-server build " - Removing test-server/build"

## Remove client/test/build
rm_file test-client build " - Removing test-client/build"

## Remove common/*.config.json
rm_file common "*.config.json" " - Removing common/*.config.json"