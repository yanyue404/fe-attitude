
var fs = require('fs');

// var  result = fs.readFileSync('./data/12.txt','utf-8');
// console.log(result)
// console.log(1)

fs.readFile('./data/12.txt','utf-8',function(err,data){
  console.log(data)
})

console.log(1)