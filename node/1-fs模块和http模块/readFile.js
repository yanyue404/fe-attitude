var fs = require('fs');
/**
path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符。
options <Object> | <string>
encoding <string> | <null> 默认为 null。
flag <string> 默认为 'r'。
callback <Function>
err <Error>
data <string> | <Buffer>

异步读取文件的全部内容
 */
fs.readFile('./data/readFile.txt','utf-8',function(error,data){
  if(error) throw error;
  console.log(data)
  console.log(__dirname)
})