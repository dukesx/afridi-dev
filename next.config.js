/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    runtime: "nodejs",
    largePageDataBytes: 256 * 1000,
  },
};
