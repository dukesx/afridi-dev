/**
 * @type {import('next').NextConfig}
 */

// const withPreact = require("next-plugin-preact");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});
module.exports = withBundleAnalyzer({
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  experimental: {
    largePageDataBytes: 256 * 1000,
  },
});

// module.exports = withPreact({
//   experimental: {
//     largePageDataBytes: 256 * 1000,
//   },
// });
