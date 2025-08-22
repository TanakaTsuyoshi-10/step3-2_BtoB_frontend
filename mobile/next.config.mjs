import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // モノレポ誤検知の警告緩和
  outputFileTracingRoot: __dirname,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname), // => "@/components/..." で解決
    };
    return config;
  },
};

export default nextConfig;