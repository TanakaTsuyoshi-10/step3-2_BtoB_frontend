/** @type {import('next').NextConfig} */
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
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000',
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
    if (!target) return [];
    return [
      { source: '/api/:path*', destination: `${target.replace(/\/+$/, '')}/:path*` },
    ];
  },
}

module.exports = nextConfig