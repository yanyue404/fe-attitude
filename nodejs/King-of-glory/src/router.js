const fs = require('fs');
const path = require('path');
const handler = require('./handler');
const urlParse = require('url');

module.exports = function(req, res) {
  var { pathname: url, query } = urlParse.parse(req.url, true);
  // 将 req.url中解构出来的 query 查询参数，添加为 req 对象的自定义属性，属性名叫做 query
  req.query = query;
  // 获取请求的URL地址
  // var url = req.url;
  // console.log(url);

  // 通过 req.method 获取到 请求方式
  var method = req.method.toLowerCase();

  if (url === '/') {
    //默认
    handler.getIndexPage(req, res);
  } else if (url === '/info') {
    //查看
    console.log(req);
    handler.showHeroInfo(req, res);
  } else if (url === '/del') {
    //删除
    handler.delHeroInfo(req, res);
  } else if (url === '/add' && method === 'get') {
    //添加
    handler.addheroPage(req, res);
  } else if (url === '/ajaxPostFile' && method === 'post') {
    //上传图片
    handler.sendImgFile(req, res);
  } else if (url === '/add' && method === 'post') {
    //提交英雄数据
    handler.submitData(req, res);
  } else if (url === '/edit' && method === 'get') {
    //编辑页面
    handler.getEditHero(req, res);
  } else if (url === '/uploadEditData' && method === 'post') {
    handler.uploadEditHero(req, res);
  } else if (
    url.indexOf('/img/') === 0 ||
    url.indexOf('/node_modules/') === 0
  ) {
    // 处理图片请求和 node_modules 模块的资源文件请求
    fs.readFile(path.join(__dirname, '../' + url), (err, data) => {
      if (err) {
        res.end('404');
      } else {
        // 判断是否为CSS文件，如果是CSS，则添加 header 信息
        if (/\.css$/.test(url)) {
          res.writeHeader(200, {
            'Content-Type': 'text/css; charset=utf-8'
          });
        }
        res.end(data);
      }
    });
  }
};
