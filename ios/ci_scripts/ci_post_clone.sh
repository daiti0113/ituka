#!/bin/sh

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE

# Install Node.js
NODE_VER=16
VERSION=$(curl -s https://nodejs.org/dist/latest-v$NODE_VER.x/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')
if [[ "$(arch)" == "arm64" ]]
then
  ARCH="arm64"
else
  ARCH="x64"
fi

curl "https://nodejs.org/dist/latest-v$NODE_VER.x/node-$VERSION-darwin-$ARCH.tar.gz" -o $HOME/Downloads/node.tar.gz
tar -xf "$HOME/Downloads/node.tar.gz"
NODE_PATH="$PWD/node-$VERSION-darwin-$ARCH/bin"
PATH+=":$NODE_PATH"
export PATH
node -v
npm -v


# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
brew install yarn

# Install dependencies
yarn install
pod install
