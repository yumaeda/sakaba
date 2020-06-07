rm .DS_Store
rm ./*/.DS_Store

aws s3 cp ./ s3://tokyo-takeout.com/ --recursive --exclude "dist/" --exclude "node_modules/" --exclude ".git/"  --exclude "README.md" --exclude "deploy.sh" --exclude ".gitignore" --exclude ".git/*" --exclude "package.json"
