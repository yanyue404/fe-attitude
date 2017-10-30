var express = require('express');
//除了创建服务器，创建一个路由模块
var router = express.Router();

router.get('/',(req,res)=>{
  res.send('get')
}).post('/',(req,res)=>{
  res.send('post');
}).get('/user',(req,res)=>{
  res.send('get-->user')
})

module.exports = router;