var fs = require('fs');


// var promise = new Promise(function(resolve,reject){
//   fs.readFile(__dirname+'/txts/1.txt','utf-8',function(err,data){
//     if(err){
//       // reject(err);
//       console.log(err.message)
//     }else {
//       // resolve(data);
//       console.log(data);
      
//     }
//   })
// })

//promise对象是立即执行函数，用函数包起来

function fn(){
  var promise = new Promise(function(resolve,reject){
  fs.readFile(__dirname+'/txts/1.txt','utf-8',function(err,data){
    if(err){
      // reject(err);
      console.log(err.message)
    }else {
      // resolve(data);
      console.log(data);
      
    }
  })
})
}
// fn();

//调用函数来执行

