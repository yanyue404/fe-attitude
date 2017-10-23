var fs = require('fs');

fs.readdir(__dirname,(err,files)=>{
  if(err) throw err;
  files.forEach((item,i)=>{
    console.log(item)
  })
})