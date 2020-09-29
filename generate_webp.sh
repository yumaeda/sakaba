#!/bin/bash

curIndex=1
for FILE in *.{JPG,jpg}
do
    if [ -f ${FILE} ]; then
        newfile=$(printf "%07d" "$curIndex")
        cwebp ${FILE} -o "${newfile}.webp"
        cwebp -resize 0 150 ${FILE} -o "${newfile}_thumbnail.webp"
        mv ${FILE} "${newfile}.jpg"
        let curIndex=curIndex+1
    fi
done
