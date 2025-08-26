#!/usr/bin/env node

// Azure App Service用のシンプルなスタートスクリプト
const path = require('path');

// 環境変数を設定
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || '8080';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

console.log('=== SERVER STARTUP ===');
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Port: ${process.env.PORT}`);
console.log(`Hostname: ${process.env.HOSTNAME}`);
console.log(`Process PID: ${process.pid}`);
console.log('========================');

// エラーハンドリング
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// standaloneディレクトリに移動
const standaloneDir = path.join(__dirname, '.next', 'standalone');
process.chdir(standaloneDir);

console.log(`Changed to directory: ${standaloneDir}`);
console.log(`Starting Next.js server on ${process.env.HOSTNAME}:${process.env.PORT}...`);

// standaloneサーバーを起動
try {
  require('./server.js');
} catch (error) {
  console.error('Failed to require server.js:', error.message);
  // フォールバック: フルパスで試行
  const serverPath = path.join(standaloneDir, 'server.js');
  console.log(`Trying absolute path: ${serverPath}`);
  require(serverPath);
}