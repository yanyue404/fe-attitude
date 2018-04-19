var http = require('http');
var fs = require('fs');

// 创建一个 http 服务器
var server = http.createServer();
// 监听 http 服务器的 request 请求
server.on('request', function (req, res) {
  var url = req.url;

  // 规定：访问的 URL 地址，必须和资源文件中的路径对应上

  // 页面文件
  // 静态资源文件：assets

  fs.readFile(__dirname + url, (err, data) => {
    if (err) { // 如果访问的内容不存在，直接返回 404
      res.end('404');
    } else {
      // 由于CSS会报这个警告：Resource interpreted as Stylesheet but transferred with MIME type text/plain: "http://127.0.0.1:3000/assets/css/index.css".
      // 处理方法：监听请求URL地址的后缀，如果是 .css 结尾的，那么就 writeHeader 即可
      if (/\.css$/.test(url)) {
        res.writeHeader(200, { "Content-Type": "text/css; charset=utf-8" });
      }
      res.end(data);
    }
  });
});

// 指定端口号并启动服务器监听
server.listen(3007, function () {
  console.log('server listen at http://127.0.0.1:3007/views/index.html');
});