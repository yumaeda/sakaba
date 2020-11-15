#!/bin/bash

restaurantId="xxxxxxxx-yyyy-zzzz-0000-111111111111"
apiUri="https://api.tokyo-takeout.com/photos"
apiKey="xxx"

for FILE in *.{JPG,jpg}
do
    if [ -f ${FILE} ]; then
        param="{\"restaurant_id\":\"${restaurantId}\"}"
        newfile=$(curl -X POST -H "x-api-key: ${apiKey}" -H "Content-Type: application/json" -d "${param}" "${apiUri}" | python3 -c "import sys, json; print(json.load(sys.stdin)['body'])")

        cwebp ${FILE} -o "${newfile}.webp"
        cwebp -resize 0 150 ${FILE} -o "${newfile}_thumbnail.webp"
        mv ${FILE} "${newfile}.jpg"
        cp "${newfile}.jpg" "${newfile}_thumbnail.jpg"
        sips -z 150 200 "${newfile}_thumbnail.jpg"
    fi
done

aws s3 cp . "s3://tokyo-takeout.com/images/restaurants/$restaurantId" --exclude "*" --include "*.webp" --include "*.jpg" --cache-control "max-age=31536000" --recursive --acl "public-read"

