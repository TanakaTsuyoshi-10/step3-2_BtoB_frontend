/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': require('path').resolve(__dirname, 'src'),
    };
    // src 直下もモジュール解決対象に
    config.resolve.modules = Array.from(new Set([...(config.resolve.modules || []), require('path').resolve(__dirname, 'src')]));
    return config;
  },
};
export default nextConfig;
