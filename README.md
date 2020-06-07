# tokyo-takeout
Repository for Tokyo Takeout

## Setup

```bash
brew install webp
```

## Deploy
1. Execute the below command.
```bash
./deploy.sh
```

## Upload Image
1. Convert .png to .webp by following command.
```bash
cwebp aaa.png -o aaa.webp
```
2. Upload both .png and .webp to S3
3. Add the following metadata.
```
Cache-Control: max-age=31536000
```

## Reference
https://dev.to/samueldaviddelacruz/how-to-host-your-static-web-app-on-aws-s3-in-10-steps-3kgp
