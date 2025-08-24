const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const API_TARGET = 'https://app-002-gen10-step3-2-py-oshima2.azurewebsites.net/api/v1';

app.prepare().then(() => {
  const server = express();

  // ★ 明示プロキシ：/api/v1/* → Azure（server.jsがあっても確実に通るように）
  server.use(
    '/api/v1',
    createProxyMiddleware({
      target: API_TARGET,
      changeOrigin: true,
      pathRewrite: { '^/api/v1': '' }, // /api/v1/login → {target}/login
      onProxyReq: (proxyReq, req) => {
        // フォームログインに必要なヘッダを維持
        if (req.method === 'POST' && !proxyReq.getHeader('content-type')) {
          proxyReq.setHeader('content-type', 'application/x-www-form-urlencoded');
        }
      },
    })
  );

  // ★ 重要：最後に catch-all で Next に委譲（これがないと rewrites が効かないケースが出る）
  server.all('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
