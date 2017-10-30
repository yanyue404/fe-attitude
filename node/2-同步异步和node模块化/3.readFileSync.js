var fs  = require('fs');
console.log('开始读取文件');

var result1 = fs.readFileSync('./data/1.txt','utf-8');
console.log(result1);
console.log('写在1的后面')

var result2 = fs.readFileSync('./data/2.txt','utf-8');
console.log(result2);
console.log('写在2的后面');

var result3 = fs.readFileSync('./data/3.txt','utf-8');
console.log(result3);
console.log('写在3的后面');





