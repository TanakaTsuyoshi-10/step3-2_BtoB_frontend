#!/usr/bin/env node

// Azure App Service用のカスタムスタートスクリプト
process.env.PORT = process.env.PORT || '8080';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

console.log(`Starting server on ${process.env.HOSTNAME}:${process.env.PORT}`);

// standaloneサーバーを起動
require('./.next/standalone/server.js');