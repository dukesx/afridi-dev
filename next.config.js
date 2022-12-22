/**
 * @type {import('next').NextConfig}
 */

// const withPreact = require("next-plugin-preact");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});
module.exports = withBundleAnalyzer({
  experimental: {
    largePageDataBytes: 256 * 1000,
  },
});

// module.exports = withPreact({
//   experimental: {
//     largePageDataBytes: 256 * 1000,
//   },
// });
