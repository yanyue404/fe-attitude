var http = require('http');
var Router = require('./route');
var bindRender = require('./render.js');




var  server = http.createServer();
server.on('request',(req,res)=>{
  bindRender(res);
  Router(req,res);
})

server.listen(3001,function(){
 console.log('Run in http://127.0.0.1:3001 ');
 
})