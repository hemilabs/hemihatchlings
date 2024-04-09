#!/bin/sh
set -e

ENV=$2
BASE='hemilabs/'

if [ "$ENV" = 'local' ]; then
    BASE=''
fi

docker build --platform linux/amd64 -t ${BASE}hemihatchlings-api -f Dockerfile.api .
docker build --platform linux/amd64 -t ${BASE}hemihatchlings-web-testnet -f Dockerfile.web.testnet .
docker build --platform linux/amd64 -t ${BASE}hemihatchlings-web-mainnet -f Dockerfile.web.mainnet .
