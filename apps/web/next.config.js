const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@equilibria-labs/shared-types'],
  output: 'standalone',
  distDir: '.next', // ✅ Explicitly ensure the correct build path
  experimental: {
    outputFileTracingRoot: __dirname,
  },
};

module.exports = nextConfig;
