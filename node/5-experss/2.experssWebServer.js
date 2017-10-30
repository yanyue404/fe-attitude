var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});



app.listen(3001, function () {
  console.log('Express server running at http://127.0.0.1:3001');
});