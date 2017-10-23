var fs = require('fs');
fs.stat(__dirname,(err,stats)=>{
  if(err) throw err;
  //文件信息
  console.dir(stats)
})