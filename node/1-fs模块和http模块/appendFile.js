var fs = require('fs');
/**
 * path
 * data
 * func
 */
fs.appendFile(__dirname+"/data/1writeFile.txt","utf-8",function(err,data){
  if(err) {
    console.log('append失败')
  }else {
  console.log('ok')
  }
})

fs.appendFile('data/readFile.txt',"utf-8",function(err,data){
  if(err) {
    console.log('append失败')
  }else {
  console.log('ok')
  }
})