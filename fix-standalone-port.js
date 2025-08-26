#!/usr/bin/env node

// ビルド後にstandalone server.jsのデフォルトポートを修正するスクリプト
const fs = require('fs');
const path = require('path');

const serverJsPath = path.join(__dirname, '.next', 'standalone', 'server.js');

console.log('🔧 Fixing standalone server.js port configuration...');

if (fs.existsSync(serverJsPath)) {
  let content = fs.readFileSync(serverJsPath, 'utf8');
  
  // ポートのデフォルト値を3000から8080に変更
  const originalPattern = /const currentPort = parseInt\(process\.env\.PORT, 10\) \|\| 3000/;
  const replacement = 'const currentPort = parseInt(process.env.PORT, 10) || 8080';
  
  if (originalPattern.test(content)) {
    content = content.replace(originalPattern, replacement);
    fs.writeFileSync(serverJsPath, content, 'utf8');
    console.log('✅ Successfully fixed standalone server.js port to 8080');
  } else {
    console.log('⚠️  Port pattern not found in server.js');
    console.log('Current content preview:');
    console.log(content.substring(0, 500) + '...');
  }
} else {
  console.error('❌ standalone/server.js not found at:', serverJsPath);
  process.exit(1);
}

console.log('🎉 Standalone port fix completed');