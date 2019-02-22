#!/usr/bin/env bash

set -e
docker build -t inspeerity-web -f test.Dockerfile .
docker-compose up -d

BUILD="yarn affected:build --base=origin/master --prod --parallel --maxParallel=4"
LINT="yarn affected:lint --base=origin/master --parallel --maxParallel=4"
TEST="yarn affected:test --base=origin/master --code-coverage --parallel --maxParallel=4"
E2E_TEST="yarn affected:e2e --base=origin/master --port=4201 --host=172.17.0.1 --parallel --maxParallel=4"

docker run --rm --net=host -v `pwd`:/usr/src/app/ -u `id -u`:`id -g` inspeerity-web /bin/sh -c "set -e; yarn; $BUILD; $LINT; $TEST; $E2E_TEST;"
docker-compose down