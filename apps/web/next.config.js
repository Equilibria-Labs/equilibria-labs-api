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
    outputFileTracingIncludes: {
      '**': ['styled-jsx/**/*'],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['styled-jsx'] = require.resolve('styled-jsx');
    }
    return config;
  },
  compiler: {
    // Remove this as it's for styled-components, not styled-jsx
    // styledComponents: true,
  },
};

module.exports = nextConfig;
