var template = require('art-template');
var http = require('http')
var path = require('path')

var server = http.createServer();

server.listen(4321,function(){
  console.log('Run http://127.0.0.1:4321')
})


server.on('request', (req, res) => {
  var url = req.url;
  // 如果请求的是 根路径 / ， 则读取模板文件，并渲染出真实的HTML字符串，并返回给浏览器
  if (url === '/') {
    // 要渲染的数据
    var dataObj = {
      username: '张三',
      age: 22,
      gender: '男',
      hobby: ['吃饭', '睡觉', '打豆豆']
    }
    var htmlR = path.join(__dirname, "/views/tmpl.html");
    // 直接调用  template 方法，接收两个参数：第一个：模板文件的路径；第二个：模板文件要渲染 的数据
    var htmlStr = template(htmlR, dataObj);
    res.end(htmlStr);
  } else {
    res.end('404');
  }
});