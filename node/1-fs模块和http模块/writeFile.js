var fs = require('fs');
/**
file <string> | <Buffer> | <integer> 文件名或文件描述符
data <string> | <Buffer> | <Uint8Array>
options <Object> | <string>
encoding <string> | <null> 默认 = 'utf8'
mode <integer> 默认 = 0o666
flag <string> 默认 = 'w'
callback <Function>
err <Error> 

异步写入数据到文件,如果文件已经存在则替代文件,不存在则先创建,后写入
__dirname 当前js文件夹的上一级目录
 */
fs.writeFile(__dirname+'/data/1wirteFile.txt','写入数据又成功了',function(err,data){
  if(err) {
    console.log('写入文件失败')
  }else {
    console.log('成功')
  }
})

fs.writeFile('./data/wirteFile.html','写入数据成功',function(err,data){
  if(err) {
    console.log('写入文件失败')
  }else {
    console.log('成功')
  }
})