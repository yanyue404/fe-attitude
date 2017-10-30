var fs = require('fs');
var path = require('path');

function readFileByPath(path,callback){
  fs.readFile(path,'utf-8',(err,dataStr)=>{
    if(err) throw callback(err);
    callback(null,dataStr);
  })
}

readFileByPath(path.join(__dirname+'/txts/1.txt'),function(err,data1){
  if(err) throw err;
  console.log(data1)
  readFileByPath(path.join(__dirname+'/txts/2.txt'),function(err,data2){
    if(err) throw err;
    console.log(data2);
    readFileByPath(path.join(__dirname+'/txts/3.txt'),function(err,data3){
      if(err) throw err;
      console.log(data3)
    })
  })

})