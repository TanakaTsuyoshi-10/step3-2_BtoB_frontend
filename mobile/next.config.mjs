import path from 'path';

export default {
  experimental: {
    // ルート誤推定防止（複数 lockfile による警告回避）
    outputFileTracingRoot: process.cwd(),
  },
  webpack: (config) => {
    // @ を mobile/ のルートに固定
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd(), 'mobile'),
    };
    // modules に mobile 直下を追加（補助的）
    config.resolve.modules = Array.from(new Set([
      ...(config.resolve.modules || []),
      path.resolve(process.cwd(), 'mobile'),
    ]));
    return config;
  },
};
