/** @type {import('next').NextConfig} */
// BtoBtoC Energy Management System - Production Build Configuration
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1',
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api/v1';
    if (!target) return [];
    return [
      { source: '/api/:path*', destination: `${target.replace(/\/+$/, '')}/:path*` },
    ];
  },
}

module.exports = nextConfig