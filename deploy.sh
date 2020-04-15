rm .DS_Store
rm ./*/.DS_Store

aws s3 cp ./ s3://tokyo-takeout.com/ --recursive --exclude ".git/"  --exclude "README.md" --exclude "deploy.sh" --exclude ".gitignore" --exclude ".git/*"
