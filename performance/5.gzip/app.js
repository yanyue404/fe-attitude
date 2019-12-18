const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');
const compression = require('compression');

const shouldCompress = (req, res) => {
  if (req.headers['x-no-compression']) {
    // don't compress responses if this request header is present
    return false;
  }

  // fallback to standard compression
  return compression.filter(req, res);
};
// 开启 gzip 压缩
app.use(compression({ filter: shouldCompress }));

app.use('/assets', express.static(__dirname + './lib'));

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

app.get('/demo.js', (req, res) => {
  //286k => 74.1k （节约 74% 文件 size大小）
  res.sendFile(path.join(__dirname, '/lib/jquery-1.7.1.js'));
});

app.listen(port, () => {
  console.log(`listen on ${port}, http://localhost:8080/`);
});
