// 用 express 如何创建一个路由
var express = require('express');
// 导入自己的业务逻辑模块
var IndexCtrl = require('../controller/indexCtrl.js');

var router = express.Router();

/*router.get('/', (req, res)=>{ // 展示首页
  res.render('index');
});*/

// 监听路由请求，然后将路由分发到具体的 Controller 中去处理
router
  .get('/', IndexCtrl.getIndexPage)
  .post('/addUser', IndexCtrl.addUser)
  .get('/info', IndexCtrl.getUserInfoPage)
  .get('/edit', IndexCtrl.getEditPage)
  .post('/edit', IndexCtrl.editUserInfo)
  .get('/del', IndexCtrl.deleteUserById);

module.exports = router;