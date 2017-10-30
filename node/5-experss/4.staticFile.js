var express = require('express');
var path = require('path');
var app = express();

//指定静态资源的访问目录
app.use('/assets',express.static('assets'));

// app.get('/',(req,res)=>{
//   res.sendFile(path.join(__dirname, '/views/index.html'));
// })


app.post('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/assets/images/5.jpg'))
})
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'/assets/images/1.jpg'))
})
app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});