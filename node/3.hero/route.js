var fs = require('fs');
var path = require('path');
var handler = require('./handler');
var urlParse = require('url');

module.exports = function(req,res){
  var url = req.url;

  if(url === '/'){
   handler.getIndexPage(req, res);
  }else if(url === '/info'){
   
  }
  
  
  
  
  
  
  
  
  
  
  else if(url.indexOf('/img/') === 0 || url.indexOf('/node_modules/') === 0) { 
    // 处理图片请求和 node_modules 模块的资源文件请求
    fs.readFile(path.join(__dirname, url), (err, data) => {
      if (err) {
        res.end('404');
      } else {
        // 判断是否为CSS文件，如果是CSS，则添加 header 信息
        if (/\.css$/.test(url)) {
          res.writeHeader(200, { "Content-Type": 'text/css; charset=utf-8' });
        }
        res.end(data);
      }
    });
  }
}