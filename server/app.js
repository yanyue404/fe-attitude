var http = require('http');
var fs = require('fs');
var Router = require('./router');

// 创建一个 http 服务器
var server = http.createServer();
// 监听 http 服务器的 request 请求
server.on('request', function (req, res) {
  var url = req.url;
  Router(req, res);

  // 规定：访问的 URL 地址，必须和资源文件中的路径对应上
  // 页面文件 views
  // 静态资源文件：assets
});

// 指定端口号并启动服务器监听
server.listen(3888, function () {
  console.log('server listen at http://127.0.0.1:3888/views/index.html');
});