#!/bin/bash

for FILE in *.jpg
do
    newfile="$(echo ${FILE} | sed -e 's/.jpg//')" 
    cwebp ${FILE} -o "${newfile}.webp"
    cwebp -resize 0 150 ${FILE} -o "${newfile}_thumbnail.webp"
done

