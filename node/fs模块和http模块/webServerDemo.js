var http =require('http');
var fs = require('fs');

var server = http.createServer();



o
server.on('request',function(req,res){
   var url = req.url;
   if(url==="/"){
    fs.readFile(__dirname + '/fs模块和http模块/views/index.html',function(err,data){
      if(err) {
        console.log('出错')
      }else {
 res.end(data);
      }
     
    })
   }
})

server.listen(3000,function(){
  console.log('Server run in http://127.0.0.1:3000')
})