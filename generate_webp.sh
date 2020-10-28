#!/bin/bash

curIndex=160
shopId=da04f5c9-ffb0-11ea-ba65-065a10bcba76

for FILE in *.{JPG,jpg}
do
    if [ -f ${FILE} ]; then
        newfile=$(printf "%07d" "$curIndex")
        cwebp ${FILE} -o "${newfile}.webp"
        cwebp -resize 0 150 ${FILE} -o "${newfile}_thumbnail.webp"
        mv ${FILE} "${newfile}.jpg"
        cp "${newfile}.jpg" "${newfile}_thumbnail.jpg"
        sips -z 150 200 "${newfile}_thumbnail.jpg"

        let curIndex=curIndex+1
    fi
done

aws s3 cp . "s3://tokyo-takeout.com/images/restaurants/$shopId" --exclude "*" --include "*.webp" --include "*.jpg" --cache-control "max-age=31536000" --recursive --acl "public-read"

