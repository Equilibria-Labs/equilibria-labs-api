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
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key',
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
