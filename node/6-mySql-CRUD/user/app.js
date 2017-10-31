
var express = require('express');

var app = express();
// 导入自定义的路由
var router = require('./router/indexRouter.js');

// 导入解析 Body 数据的中间件
var bodyParser = require('body-parser');
// 注册 解析 Body 数据的中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 1. 托管静态资源文件
app.use('/node_modules', express.static('node_modules'));
// 设置 express 的模板引擎
app.set('view engine', 'ejs');

// 注册自己创建的路由模块【中间件】
app.use(router);


app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});
