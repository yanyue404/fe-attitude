var express = require('express');

var path = require('path');

var app = express();

app.listen(3001,function(){
  console.log('app listening on port http://127.0.0.1:3001')
})

app.get('/', (req, res) => {
  // 调用 express 封装的 res.sendFile 发送页面文件
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/assets/*', (req, res) => {
  console.log('OK');
  res.sendFile(path.join(__dirname, req.url));
});
