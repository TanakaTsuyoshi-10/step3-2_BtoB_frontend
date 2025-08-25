/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  
  // Build optimizations
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Environment validation
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  async rewrites() {
    return [
      // API proxy - プロダクション環境へのプロキシ
      {
        source: '/api/v1/:path*',
        destination: 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/:path*',
      },
      // 二重admin対策
      {
        source: '/admin/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};
export default nextConfig;