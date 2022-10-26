/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    runtime: "nodejs",
    largePageDataBytes: 256 * 1000,
  },
};

export default nextConfig;
