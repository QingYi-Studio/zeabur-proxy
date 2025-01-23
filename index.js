const http = require('http');
const httpProxy = require('http-proxy');

// 创建代理服务器，并禁用自动重定向
const proxy = httpProxy.createProxyServer({
  followRedirects: false  // 禁止自动跟随重定向
});

const server = http.createServer((req, res) => {
  const targetUrl = req.url.split('/')[1];  // 从 URL 中提取目标域名
  const protocol = targetUrl.startsWith('https') ? 'https' : 'http';
  const target = `${protocol}://${targetUrl}`;

  console.log(`代理请求目标: ${target}`);

  // 处理代理请求
  proxy.web(req, res, { target: target }, (e) => {
    console.error('代理错误:', e);
    res.statusCode = 500;
    res.end('代理请求失败');
  });
});

// 启动代理服务器监听端口 8080
server.listen(8080, () => {
  console.log('代理服务器运行在 http://localhost:8080');
});
