rm .DS_Store
rm ./*/.DS_Store

aws s3 cp ./ s3://tokyo-takeout.com/ --recursive --exclude "dist/*" --exclude "node_modules/*" --exclude ".git/"  --exclude "README.md" --exclude "deploy.sh" --exclude ".gitignore" --exclude ".git/*" --exclude "package.json" --exclude "package-lock.json" --exclude "webpack.config.js" --exclude "tsconfig.json"
aws cloudfront create-invalidation --distribution-id E37SHWAC97A2BI --paths "/*"
