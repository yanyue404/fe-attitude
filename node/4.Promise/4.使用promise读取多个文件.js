var fs = require('fs');

function f1(filePath){
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath,'utf-8',(err,dataStr)=>{
      if(err){
        reject(err)
      }else {
        resolve(dataStr)
      }
    })
  })
}


//推荐的操作
f1(__dirname+'/txts/1.txt').then((data1)=>{
  console.log(data1);

  //在第一个then中返回一个新的Promise对象
  return f1(__dirname+'/txts/2.txt');
}).then((data2)=>{
  console.log(data2);
  return f1(__dirname+'/txts/3.txt');
}).then((data3)=>{
  console.log(data3)
}).catch((err)=>{
  console.log(err.message);
  
})

//111
//222
//333