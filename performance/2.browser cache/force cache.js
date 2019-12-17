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

app.get('/demo.js', (req, res) => {
  let jsPath = path.resolve(__dirname, './lib/demo.js');
  let cont = fs.readFileSync(jsPath);
  // 设置相对时间,首次请求后120s内刷新 Status Code: 200 OK (from memory cache)
  res.setHeader('Cache-Control', 'public,max-age=120'); //相对时间，120s内，直接使用浏览器缓存
  res.end(cont);
});

app.listen(port, () => {
  console.log(`listen on ${port}, http://localhost:8080/`);
});
