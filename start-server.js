#!/usr/bin/env node

// Azure App Service専用スタートスクリプト
process.env.NODE_ENV = 'production';

// Azure環境変数を確実に設定 (Azureは PORT を設定してくれる)
if (!process.env.PORT && process.env.WEBSITES_PORT) {
  process.env.PORT = process.env.WEBSITES_PORT;
}
process.env.PORT = process.env.PORT || '8080';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

console.log('🚀 Azure App Service Startup');
console.log(`PORT: ${process.env.PORT}`);
console.log(`HOSTNAME: ${process.env.HOSTNAME}`);

// standaloneサーバーを直接起動 (ディレクトリ変更なし)
const path = require('path');
const serverPath = path.join(__dirname, '.next', 'standalone', 'server.js');

console.log(`Starting server: ${serverPath}`);

try {
  require(serverPath);
} catch (error) {
  console.error('Server startup failed:', error);
  process.exit(1);
}