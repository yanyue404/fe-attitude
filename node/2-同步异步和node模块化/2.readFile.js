var fs = require('fs');
console.log('开始读取');

fs.readFile('./data/1.txt','utf-8',function(err,data){
  if(err) throw err;
  console.log(data)
})
console.log('写在1的后面')

fs.readFile('./data/2.txt','utf-8',function(err,data){
  if(err) throw err;
  console.log(data)
})
console.log('写在2的后面')

fs.readFile('./data/3.txt','utf-8',function(err,data){
  if(err) throw err;
  console.log(data)
})
console.log('写在3的后面')
console.log('');


