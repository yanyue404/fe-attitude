var http = require("http");
const qs = require("querystring");

var server = http.createServer();
var server = http
  .createServer(function (req, res) {
    if (req.url == "/" && req.method == "POST") {
      var body = "";
      req.on("data", function (chunk) {
        body += chunk; //读取请求体
      });

      req.on("end", function () {
        console.log(body);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("hello world");
        console.log(qs.parse(body).username); //使用qs解析请求体
        console.log(qs.parse(body).password);
      });
    }
  })
server.listen(3001, function () {
  console.log('Run in http://127.0.0.1:3001 ');

})
