
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

//托管静态资源
app.use('/assets', express.static('assets'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html')); 
});



app.listen(3001, (err) => {
  if(err) throw err;
  console.log('listening on http://127.0.0.1:3001');
})