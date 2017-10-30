var express = require('express');

var app = express();

var router = require('./7.route');

app.use('/abc',router);

app.listen(3001,function(){
  console.log('router listening http://127.0.0.1:3001')
})