
var express = require('express');

var app = express();

var template = require('express-art-template');
// 修改默认定界符
template.template.defaults.rules[0].test = /<\?(#?)((?:==|=#|[=-])?)([\w\W]*?)(-?)\?>/;

// 自己创建一个模板引擎
// app.engine('html', require('express-art-template'));
app.engine('html', template);
app.set('view engine', 'html');

// app.set('view engine', 'express-art-template');

app.get('/', (req, res) => {
  res.render('index4.html', {name:'zs'});
});


app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});