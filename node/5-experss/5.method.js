var express = require('express');
var path = require('path');

var app = express();

//静态资源目录可以托管多个
app.use('/node_modules',express.static('node_modules'));
app.use('/public',express.static('public'));
app.use('/assets',express.static('assets'));


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'views/index.html'));
})

app.get('/info',(req,res)=>{
  res.send('get发起的info请求');
})

app.listen(3001,function(){
  console.log('listening on http://127.0.0.1:3001');
  
})