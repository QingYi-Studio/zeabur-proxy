// 引入所需的模块
const http = require('http');
const httpProxy = require('http-proxy');

// 创建代理服务器
const proxy = httpProxy.createProxyServer({});

// 创建服务器来监听请求
const server = http.createServer((req, res) => {
  // 获取目标 URL，例如 "www.myproxy.com/youtube.com" 中的 "youtube.com"
  const targetUrl = req.url.split('/')[1]; // 从 URL 中提取目标域名

  // 将请求代理到目标 URL
  const target = `http://${targetUrl}`;

  // 处理代理请求
  proxy.web(req, res, { target: target }, (e) => {
    console.error('代理错误:', e);
    res.statusCode = 500;
    res.end('代理请求失败');
  });
});

// 监听端口 8080
server.listen(8080, () => {
  console.log('代理服务器运行在 http://localhost:8080');
});
