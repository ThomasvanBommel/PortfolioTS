 # File: cleanup.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Tuesday March 30th 2021 7:13pm
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
# rm_file . "*.tsbuildinfo" " - Removed *.tsbuildinfo"

## Remove build/ directories
rm_file build "*" " - Removing build/ directories"

## Remove common/build + common/*.config.json
# rm_file common build " - Removing common/build"
# rm_file common "config.json" " - Removing common/config.json"

## Remove server/build
# rm_file server build " - Removing server/build"

## Remove client/build
# rm_file client build " - Removing client/build"