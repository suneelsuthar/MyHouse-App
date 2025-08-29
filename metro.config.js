// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add SVG support
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

// Ensure SVG files are properly bundled
config.resolver.assetExts.push('svg');

module.exports = config;
