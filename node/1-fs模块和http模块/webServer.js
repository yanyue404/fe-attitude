var http =require('http');

var server = http.createServer();

server.listen(3000,function(){
  console.log('Server run in http://127.0.0.1:3000')
})

//监听端口,每次请求都会触发request事件
/**
 * request 请求参数(包含请求相关的数据,如url与请求类型)
 * reponse 响应参数(包含响应相关的数据和方法)
 */
server.on('request',function(request,response){
   response.writeHeader(200,{
     "Content-Type":"text/html;charset=utf-8"
   })
   response.write('<h2>服务创建成功</h2>')
   response.end('<h1>Server返回数据</h1>')
   response.write('<h2>服务关闭连接</h2>')
   //end向服务器发送一段内容,同时结束响应,一次响应中end只能执行一次
})