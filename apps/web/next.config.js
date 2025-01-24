/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@equilibria-labs/shared-types'],
  output: 'standalone',
  distDir: '.next',
  experimental: {
    runtime: 'edge',
  },
};

module.exports = nextConfig;
