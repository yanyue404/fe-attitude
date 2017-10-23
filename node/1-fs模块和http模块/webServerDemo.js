var http = require('http');
var fs = require('fs');
var path = require('path');
// path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'

var server = http.createServer();


server.on('request', function (req, res) {
  res.writeHeader(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  var url = req.url;
  if (url === "/") {

    fs.readFile(path.join(__dirname,"/data/readFile.html"), (err, data) => {
      if (err) throw err;

      res.end(data);


    });


  }
})

server.listen(3000, function () {
  console.log('Server run in http://127.0.0.1:3000')
})