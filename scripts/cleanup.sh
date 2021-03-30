 # File: cleanup.sh
 # Created: Thursday March 25th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Tuesday March 30th 2021 7:18pm
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

set -e

echo "Clean-up:"

echo " - Removing build/ directory"
rm -rf build/

 # Remove build files and print message if they exist
 # Param $1 = Location to search
 # Param $2 = Name or pattern of dir / file to delete
 # Param $3 = Message
# rm_file () {
#     if [ $(find $1 -name "$2" | wc -l) -gt 0 ]; then
#         find $1 -name "$2" -exec rm -rf {} +

#         echo "$3"
#     fi
# }