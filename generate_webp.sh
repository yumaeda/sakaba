#!/bin/bash

curIndex=1
for FILE in *.{jpg,JPG}
do
    newfile=$(printf "%07d" "$curIndex")
    cwebp ${FILE} -o "${newfile}.webp"
    cwebp -resize 0 150 ${FILE} -o "${newfile}_thumbnail.webp"
    mv -i ${FILE} "${newfile}.jpg"
    let curIndex=curIndex+1
done
