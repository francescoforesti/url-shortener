#!/usr/bin/env sh
ROOT_DIR=$(pwd)

echo "Preparing the "
rm -f dist
rm -f fe/build
mkdir -p dist/app

echo 'build and test the backend...'
cd be && npm install && npm run test # run tsc & tests during build
cd "$ROOT_DIR" || exit
cp -rf be/dist/ dist/
cp -rf be/node_modules dist/
echo '..done'

echo 'build the frontend..'
cd fe && npm install && npm run build
cp -rf fe/build/* dist/app/
echo '..done!'

cd "$ROOT_DIR" || exit
echo 'now execute the "run.sh" script (sh run.sh)'
