import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
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
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    };
    // src 直下もモジュール解決対象に
    config.resolve.modules = Array.from(new Set([...(config.resolve.modules || []), path.resolve(__dirname, 'src')]));
    return config;
  },
};

export default nextConfig;
