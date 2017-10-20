var fs = require('fs');

fs.readFile('./data/input.txt',function(err,data){
  if(err){
    console.log(err)
  }else {
    console.log('异步读取文件:'+data)
  }
})
var data =fs.readFileSync('./data/input.txt')
console.log('同步读取文件:'+data)

console.log('文件读取完毕')

//建议大使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。