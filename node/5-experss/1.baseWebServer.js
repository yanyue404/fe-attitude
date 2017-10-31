var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer();
server.on('request', (req, res) => {
  var url = req.url;
  if (url === '/') {
    fs.readFile(path.join(__dirname + '/views/index.html'), (err, data) => {
      if (err) throw err;
      res.end(data);
    })
  } else if (url.indexOf('/assets/') === 0) { //请求的是静态资源
    fs.readFile(path.join(__dirname + url), (err, data) => {
      if (err) res.end('404');
      else {
        res.end(data);
      }
    })

  } else {
    res.end('404')
  }
})
console.log('12')
server.listen('3000', function () {
  console.log('Http Server running at http://127.0.0.1:3000')
})