const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@equilibria-labs/shared-types'],
  output: 'standalone',
  distDir: '.next',
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  basePath: '',
};

module.exports = nextConfig;
