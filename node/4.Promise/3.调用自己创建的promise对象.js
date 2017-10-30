var fs = require('fs');

function fn(){
  return new Promise((resolve,reject)=>{
    fs.readFile(__dirname+'/txts/1.txt','utf-8',(err,dataStr)=>{
      if(err){
        reject(err)
      }else{
        resolve(dataStr)
      }

    })
  })
}

fn().then(dataStr=>{
 console.log(dataStr);
 
},err=>{
  console.log(err.message);
  
})