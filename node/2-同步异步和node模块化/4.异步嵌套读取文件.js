var fs = require('fs');

fs.readFile('./data/1.txt','utf-8',(err,data)=>{
  if(err) throw err;
  console.log(data);
  fs.readFile('./data/2.txt','utf-8',(err,data)=>{
    if(err) throw err;
    console.log(data);
    fs.readFile('./data/3.txt','utf-8',(err,data)=>{
      if(err) throw err;
      console.log(data);
      
    })
  })
})