// 导入 express 模块
var express = require('express');
// 创建 express 的服务器实例
var app = express();
// 1. 导入 ejs 模块
var ejs = require('ejs');
// 2. 修改界定符
ejs.delimiter = '?';

// app.engine 代表自己创建一个模板引擎
// 第一个参数：表示创建的模板引擎的名称，同时也表示模板页面的后缀名
// 第二个参数：表示调用自己创建的这个模板引擎的时候，使用哪个方法去渲染模板页面
app.engine('html', ejs.renderFile);
// 注册自定义的模板引擎到express中
app.set('view engine', 'html');

// 在express中，约定大于配置
// 约定了：如果不指定默认模板文件存放路径，那么，默认的路径是根目录下面的`views`文件夹

app.get('/', (req, res)=>{
  res.render('index3');
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});