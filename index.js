const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');

// 创建代理服务器
const proxy = httpProxy.createProxyServer({});

// 创建一个 HTTP 服务器来监听请求
const server = http.createServer((req, res) => {
  // 获取请求的目标 URL，例如 "www.myproxy.com/youtube.com"
  const targetUrl = req.url.split('/')[1];  // 从 URL 中提取目标域名

  // 选择使用 http 或 https
  const protocol = targetUrl.startsWith('https') ? 'https' : 'http';
  const target = `${protocol}://${targetUrl}`;

  // 输出日志，查看代理请求的目标
  console.log(`代理请求目标: ${target}`);

  // 处理代理请求
  proxy.web(req, res, { target: target }, (e) => {
    console.error('代理错误:', e);
    res.statusCode = 500;
    res.end('代理请求失败');
  });
});

// 启动代理服务器监听 HTTP 请求
server.listen(8080, () => {
  console.log('代理服务器运行在 http://localhost:8080');
});
