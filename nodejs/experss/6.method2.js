// 导入 express 模块
var express = require('express');
// 创建 express 的服务器实例
var app = express();


// 由于我们请求的都是 / 根路径，只是 method 方法和 处理的逻辑不一样，所以我们可以优化下请求的路由
/*app.get('/', (req, res) => {
  res.send('get请求的/路径');
});

app.post('/', (req, res) => {
  res.send('post请求/路径');
});

app.put('/', (req, res) => {
  res.send('put请求/路径');
});

app.delete('/', (req, res) => {
  res.send('delete请求/路径');
});*/

/*app.route('/')
  .get((req, res) => {
    res.send('get请求的/路径');
  })
  .post((req, res) => {
    res.send('post请求的/路径');
  })
  .put((req, res) => {
    res.send('put请求的/路径');
  })
  .delete((req, res) => {
    res.send('delete请求的/路径');
  })*/

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});