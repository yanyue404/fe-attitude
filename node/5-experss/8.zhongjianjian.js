// 导入 express 模块
var express = require('express');
// 创建 express 的服务器实例
var app = express();

// use 不指定任何路径的时候，可以处理任何请求路径和任何请求method
// 如果想进入到下一个中间件，需要调用next参数
app.use((req, res, next) => {
  console.log('这是第1个中间件');
  req.a = '1';
  // 通过 next() 来调用下一个中间件
  next();
});

app.use((req, res, next) => {
  console.log('这是第2个中间件');
  req.b = '2';
  console.log(req.a);
  // next 和 send等res相关方法，只能二选一
  res.send('OK');
  // next();
});

app.use((req, res) => {
  console.log('这是第3个中间件');
  req.c = '3';
  console.log(req.a);
  res.send('No');
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});