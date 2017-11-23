
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./handler/login');


var app = express();


//托管静态资源
app.use('/assets', express.static('assets'));

// 加入bodyParser中间件
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());


var router = express.Router();
app.use(router);
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html')); 
});
router.post('/signin',function(req,res){
   controller.getIndexPage(req,res);
})



app.listen(3001, (err) => {
  if(err) throw err;
  console.log('listening on http://127.0.0.1:3001');
})