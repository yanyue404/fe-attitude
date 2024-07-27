const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');
const md5 = require('md5');

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        Http Cache Demo
        <script src="/demo.js"></script>
    </body>
    </html>`);
});

// 为了解决文件修改时间不精确带来的问题，服务器和浏览器再次协商，这次不返回时间，返回文件的唯一标识 ETag

// - 1. 浏览器请求静态资源demo.js
// - 2. 服务器读取磁盘文件demo.js，返给浏览器，同时带上文件的唯一标识ETag
// - 3. 当浏览器上的缓存文件过期时，浏览器带上请求头If-None-Match（等于上一次请求的ETag）请求服务器
// - 4. 服务器比较请求头里的If-None-Match和文件的ETag。如果一致就继续使用本地缓存（304），如果不一致就再次返回文件内容和ETag。
// -循环请求。。

app.get('/demo.js', (req, res) => {
  let jsPath = path.resolve(__dirname, './lib/demo.js');
  let cont = fs.readFileSync(jsPath);

  let etag = md5(cont);

  // 协商验证，是否有修改
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    res.setHeader('ETag', etag);
    res.writeHead(200, 'OK');
    res.end(cont);
  }
});

app.listen(port, () => {
  console.log(`listen on ${port}, http://localhost:8080/`);
});
