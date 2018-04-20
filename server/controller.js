var path = require('path');
var fs = require('fs');
var formidable = require('formidable'); //解析文件上传的数据
var qs = require('querystring');
module.exports = {
  getIndexPage(req, res) {
    fs.readFile(__dirname + "/views/index.html", (err, data) => {
      res.end(data);
    })
  },
  callbackData(req, res) {
    var body = null;
    req.on('data', function (data) {
      // 获取前端传递的值 参数
      var data = data.toString();//Buffer对象转字符串
      body = qs.parse(data);
      console.log(body)
    });
    req.on("end", function () {
      res.writeHead(200, { "Content-Type": "text/html" });
    });
    res.end(body)
  }
}