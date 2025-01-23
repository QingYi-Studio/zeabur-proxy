const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 动态路径重写和代理
app.use('/proxy/:match/:url*', (req, res, next) => {
  const { match, url } = req.params;
  const protocol = req.url.startsWith('/httpproxy') ? 'http' : 'https';
  const targetUrl = `${protocol}://${match}/${url}`;

  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      [`^/proxy/${match}`]: '', // 去掉路径中的/proxy/:match
      [`^/httpproxy/${match}`]: '', // 去掉路径中的/httpproxy/:match
    },
  })(req, res, next);
});

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
