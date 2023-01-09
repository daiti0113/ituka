#!/bin/sh

# Install CocoaPods using Homebrew.
brew install cocoapods

# Install dependencies managed with yarn
yarn install

# Install dependencies managed with CocoaPods.
cd ios
pod install
