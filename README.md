# sakaba-front
Repository for Sakabas Frontend

## Deployment
- Automatically deployed by GitHub Action upon commit to the main branch.

## Running locally
### Preparation
- Run below command to install pnpm.
```sh
brew install pnpm
```

### Install packages
```sh
export NODE_AUTH_TOKEN=ghp_xxxxxxxxxxxxxxxx
pnpm install
```

### Build
```sh
pnpm run build
```

### Start running locally
```sh
pnpm start
```

## Reference
- https://britishgeologicalsurvey.github.io/development/migrating-from-npm-to-pnpm/
