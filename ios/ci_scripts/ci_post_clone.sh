#!/bin/sh

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE

# Install Node.js (バージョンを16.19.0に固定)
if [[ "$(arch)" == "arm64" ]]
then
  ARCH="arm64"
else
  ARCH="x64"
fi

curl "https://nodejs.org/dist/latest-v16.x/node-v16.19.0-darwin-x64.tar.gz" -o /Users/local/Downloads/node.tar.gz
tar -xf "/Users/local/Downloads/node.tar.gz"
NODE_PATH="/Volumes/workspace/repository/ios/ci_scripts/node-v16.19.0-darwin-x64/bin"
PATH+=":/Volumes/workspace/repository/ios/ci_scripts/node-v16.19.0-darwin-x64/bin"
export PATH
node -v
npm -v


# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
brew install yarn

# Install dependencies
yarn install
pod install
