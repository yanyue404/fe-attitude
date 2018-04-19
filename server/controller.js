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
    req.on("data", function (chunk) {
      body += chunk; //读取请求体
    });
    var json = null;
    req.on("end", function () {
      res.writeHead(200, { "Content-Type": "text/html" });
      /*  json = JSON.stringify({
         "num": qs.parse(body).num,
         "price": qs.parse(body).price
       }) */
      json = '123'
      console.log(json)
    });
    res.end("showData(" + json + ")")
  }
}