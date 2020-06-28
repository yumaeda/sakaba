# tokyo-takeout
Repository for Tokyo Takeout

## Setup

```bash
brew install webp
```

## Deploy
- Automatically deployed upon commit.

## Upload Image
1. Convert .png to .webp by following command.
```bash
cwebp aaa.png -o aaa.webp
cwebp aaa_thumbnail.png -o aaa_thumbnail.webp
```
2. Upload both .png and .webp to S3
3. Add the following metadata.
```
Cache-Control: max-age=31536000
```
