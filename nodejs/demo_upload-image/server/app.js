var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
// "dest" 设置在哪儿存储文件
var upload = multer({ dest: './public/avatars/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 从应用程序目录中的“public”目录为应用程序提供静态内容(直接访问内部文件夹及文件)：
app.use(express.static(path.join(__dirname, 'public')));

// 允许跨域访问
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post('/upload', upload.single('avatar'), function(req, res) {
  console.log(req);
  res.send(req.file);
});

var server = app.listen(8000, function() {
  console.log('Listening on port %s...', server.address().port);
});
