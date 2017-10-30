// 导入 express 模块
var express = require('express');
// 创建 express 的服务器实例
var app = express();

// 在express中，如果想使用第三方的模板引擎，需要先为express指定模板引擎
// 第二步：注意 set 的第一个参数是固定写法，必须是字符串`view engine`,代表指定模板引擎
app.set('view engine', 'ejs');
// 修改默认的模板页面存放路径，第一个参数是字符串`views`,是固定写法，不能修改
// 第二个参数，是要指定的新的模板文件存放路径，为了防止出现路径问题，最好使用path模块指定路径
app.set('views', './myviews');


app.get('/', (req, res) => {
  // express 框架已经帮我们封装好了 render 函数
  // 记住：默认res.render()在渲染模板页面的时候，默认就会去`views`文件夹下查找模板页面
  // 第三步：
  // res.render('index1.ejs', {});
  res.render('test.ejs', {
    name: '飒飒',
    age: 20,
    hobby: ['唱歌', '跳舞', '撩妹']
  });
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});