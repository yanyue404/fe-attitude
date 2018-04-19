var fs = require('fs');
var path = require('path');
var controller = require('./controller');
var urlParse = require('url');

module.exports = function (req, res) {
  var {
    pathname: url,
    query
  } = urlParse.parse(req.url, true);
  // 将 req.url中解构出来的 query 查询参数，添加为 req 对象的自定义属性，属性名叫做 query

  req.query = query;
  var url = req.url;

  req.on('data', function (data) {
    // 获取前端传递的值 参数
    console.log(data.toString()); //Buffer对象转字符串
  });

  var method = req.method;

  if (url === '/') { //默认
    controller.getIndexPage(req, res);
  }
  if (url === '/upload' && method == "POST") {
    controller.callbackData(req, res);
  }
  else if (url.indexOf('/') !== -1) {
    fs.readFile(__dirname + url, (err, data) => {
      if (err) { // 如果访问的内容不存在，直接返回 404
        res.writeHeader(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end('<h1>404,你访问的页面不存在<h1>');
      } else {
        // 由于CSS会报这个警告：Resource interpreted as Stylesheet but transferred with MIME type text/plain: "http://127.0.0.1:3000/assets/css/index.css".
        // 处理方法：监听请求URL地址的后缀，如果是 .css 结尾的，那么就 writeHeader 即可
        if (/\.css$/.test(url)) {
          res.writeHeader(200, { "Content-Type": "text/css; charset=utf-8" });
        }
        res.end(data);
      }
    });
  }
}