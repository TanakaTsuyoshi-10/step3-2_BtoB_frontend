/** @type {import('next').NextConfig} */
const nextConfig = {
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
      {
        source: '/api/v1/:path*',
        destination: 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1/:path*',
      },
    ];
  },
};
export default nextConfig;
