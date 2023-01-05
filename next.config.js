/**
 * @type {import('next').NextConfig}
 */

// const withPreact = require("next-plugin-preact");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});
module.exports = withBundleAnalyzer({
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  compiler: {
    emotion: true,
    removeConsole: true,
  },
  experimental: {
    largePageDataBytes: 256 * 1000,
  },
});
