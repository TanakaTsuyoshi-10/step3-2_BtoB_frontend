// 環境変数の検証
import './env.validate.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
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
      // ルート階層からadmin内部へのリダイレクト
      {
        source: '/dashboard',
        destination: '/admin/dashboard'
      },
      {
        source: '/login',
        destination: '/admin/login'
      },
      {
        source: '/register', 
        destination: '/admin/register'
      },
      {
        source: '/points',
        destination: '/admin/points'
      },
      {
        source: '/ranking',
        destination: '/admin/ranking'
      },
      {
        source: '/reports/:path*',
        destination: '/admin/reports/:path*'
      },
      {
        source: '/rewards',
        destination: '/admin/rewards'
      },
      {
        source: '/devices',
        destination: '/admin/devices'
      },
      {
        source: '/energy-records',
        destination: '/admin/energy-records'
      },
      {
        source: '/incentives',
        destination: '/admin/incentives'
      }
    ];
  },
  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: false
      }
    ];
  },
  
  env: {
    // デモモードの場合は環境変数を設定しない（undefinedのまま）
    // NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || undefined
  },
  
  typescript: {
    ignoreBuildErrors: false
  },
  
  eslint: {
    ignoreDuringBuilds: false
  },
  
  // デプロイ時のメモリ不足対策
  compress: true,
  poweredByHeader: false,
  
  experimental: {
    // optimizeCss: true, // ← critters モジュール要求により無効化
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', '@iconify/react']
  }
};
export default nextConfig;