var http = require('http');
var fs = require('fs');
var Router = require('./router');

var server = http.createServer();
server.on('request', function (req, res) {
  var url = req.url;
  Router(req, res);

  // 规定：访问的 URL 地址，必须和资源文件中的路径对应上
  // 页面文件 views
  // 静态资源文件：assets
});

server.listen(3008, function () {
  console.log('server listen at http://127.0.0.1:3008/views/index.html');
});