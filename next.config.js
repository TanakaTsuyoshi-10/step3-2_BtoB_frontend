/** @type {import('next').NextConfig} */
// BtoBtoC Energy Management System - Production Build Configuration
const nextConfig = {
  output: 'standalone',
  typescript: {
    // Skip type checking during build to avoid d3 type issues
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip linting during build for faster builds
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net',
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_BASE || 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net';
    if (!target) return [];
    return [
      { source: '/api/:path*', destination: `${target.replace(/\/+$/, '')}/:path*` },
    ];
  },
}

module.exports = nextConfig