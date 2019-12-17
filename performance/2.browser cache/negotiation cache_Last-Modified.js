const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');

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
// 为了校验强缓存时间过后文件没有改变，而重新向服务器请求的情况。
// 浏览器和服务器协商，服务器每次返回文件的同时，告诉浏览器文件在服务器上最近的修改时间。请求过程如下：

// - 1. 浏览器请求静态资源demo.js
// - 2. 服务器读取磁盘文件demo.js，返给浏览器，同时带上文件上次修改时间 Last-Modified（GMT标准格式）
// - 3. 当浏览器上的缓存文件过期时，浏览器带上请求头If-Modified-Since（等于上一次请求的Last-Modified）请求服务器
// - 4. 服务器比较请求头里的If-Modified-Since和文件的上次修改时间。如果果一致就继续使用本地缓存（304），如果不一致就再次返回文件内容和Last-Modified。
// - 循环请求。。
app.get('/demo.js', (req, res) => {
  let jsPath = path.resolve(__dirname, './lib/demo.js');
  let cont = fs.readFileSync(jsPath);
  let status = fs.statSync(jsPath);

  let lastModified = status.mtime.toUTCString();
  // 协商验证，是否有修改
  if (lastModified === req.headers['if-modified-since']) {
    res.writeHead(304, 'Not Modified');
    res.end();
  } else {
    // 首次请求，以及服务器端文件有变更
    res.setHeader('Cache-Control', 'public,max-age=5'); // 小的过期时间（强缓存无效后验证协商缓存）
    res.setHeader('Last-Modified', lastModified); // 告诉浏览器文件最后修改时间
    res.writeHead(200, 'OK');
    res.end(cont);
  }

  res.end(cont);
});

app.listen(port, () => {
  console.log(`listen on ${port}, http://localhost:8080/`);
});
