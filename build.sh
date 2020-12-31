#!/usr/bin/env sh
ROOT_DIR=$(pwd)

if [ ! -d "be" ] || [ ! -d "fe" ]; then
  echo "expected source folders don't exist, exiting"
  exit 1;
fi

echo "Preparing the build.."
rm -rf dist
rm -rf be/dist
rm -rf fe/build
mkdir -p dist/frontend

echo 'Step 1: build and test the backend...'
cd be && npm install && npm run tsc && npm run test # run tsc & tests during build
cd "$ROOT_DIR" || exit
cp -rf be/dist/ dist/
cp -rf be/node_modules dist/
echo '..done'

echo 'Step 2: build the frontend..'
cd fe && npm install && npm run build:production
cd "$ROOT_DIR" || exit
cp -rf fe/build/* dist/frontend/
echo '..done!'
echo 'now execute the "run.sh" script (sh run.sh)'
