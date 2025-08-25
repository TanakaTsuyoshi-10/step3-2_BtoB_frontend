/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // ← 重要: .next/standalone を出力
  typescript: {
    // ビルド時の型チェックをスキップ
    ignoreBuildErrors: true,
  },
  eslint: {
    // ビルド時のESLintチェックをスキップ
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      // API proxy
      {
        source: '/api/v1/:path*',
        destination:
          'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/:path*',
      },
      // 二重admin対策 - /admin/admin/* → /admin/*
      {
        source: '/admin/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },
};
export default nextConfig;