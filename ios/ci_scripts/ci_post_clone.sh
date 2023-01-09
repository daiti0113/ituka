#!/bin/sh

echo "`ci_post_clone.sh` is running..."

# Install CocoaPods and yarn using Homebrew.
brew install cocoapods
echo "Installed Cocoapods"

brew install yarn
echo "Installed yarn"

# Install dependencies
yarn install
pod install
