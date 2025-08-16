/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8000',
  },
  async rewrites() {
    const target = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:8000';
    if (!target) return [];
    return [
      { source: '/api/:path*', destination: `${target.replace(/\/+$/, '')}/:path*` },
    ];
  },
}

module.exports = nextConfig