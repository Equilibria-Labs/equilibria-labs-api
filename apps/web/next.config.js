/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@equilibria-labs/shared-types'],
  output: 'standalone',
  distDir: '.next',
  experimental: {
    // Remove serverActions since it's enabled by default now
    serverComponentsExternalPackages: [],
  },
  // Ensure proper route handling
  pageExtensions: ['tsx', 'ts'],
  // Update webpack config to handle monorepo
  webpack: (config, { isServer }) => {
    // Add any necessary webpack customizations
    return config;
  },
};

module.exports = nextConfig;
