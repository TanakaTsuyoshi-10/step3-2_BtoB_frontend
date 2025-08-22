import path from 'path';

export default {
  // Next.js 15 では top-level に置く
  outputFileTracingRoot: process.cwd(),

  webpack: (config) => {
    // @ を mobile/ のルートに固定
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd(), '.'),
    };
    // 参照パスを安定化
    config.resolve.modules = Array.from(new Set([
      ...(config.resolve.modules || []),
      path.resolve(process.cwd(), '.'),
    ]));
    return config;
  },
};
