 # File: config.sh
 # Created: Tuesday March 30th 2021
 # Author: Thomas vanBommel
 # 
 # Last Modified: Friday April 2nd 2021 1:40pm
 # Modified By: Thomas vanBommel
 # 
 # CHANGELOG:

#!/bin/bash

## Check if common/config.json exists, if not create it.
# if [ ! -f "common/config.json" ]; then
    REDIRECT=$([ "$NODE_ENV" = "development" ] && echo 8000 || echo 80)
    PORT=$([ "$NODE_ENV" = "development" ] && echo 8443 || echo 443)
    HOST=$(hostname -I | awk '{ print $1 }')
    ID='UCbVqDf-obg_ylZZjNp1hK7Q'

    echo "Creating config file 'common/config.json':"
    echo "{ \"redirect\": $REDIRECT, \"port\": $PORT, \"host\": \"$HOST\", \"channelId\": \"$ID\" }" > common/config.json
    echo " - Done"
# fi