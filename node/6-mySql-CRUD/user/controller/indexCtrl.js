const userModel = require('../model/UserModel.js');
let querystring = require('querystring');

module.exports = {
  getIndexPage(req, res) { // 具体的业务逻辑，展示首页
    userModel.getAllUsers((err, list) => {
      if (err) throw err;
      res.render('index', { users: list });
    });
  },
  addUser(req, res) { // 添加用户
    /*var data = '';
    req.on('data', (chunk)=>{
      data += chunk;
    });
  
    req.on('end', ()=>{
      var obj = querystring.parse(data);
    });*/

    var user = req.body;
    console.log(user);
    userModel.addUser(user, (err, result) => {
      if (err) throw err;
      // 当数据保存成功之后，再把所有的用户列表，以JSON格式返回给客户端去渲染
      userModel.getAllUsers((err, users) => {
        if (err) throw err;
        res.json({ err_code: 0, users: users });
      });
    });
  },
  getUserInfoPage(req, res) { // 查看用户信息
    var id = req.query.id;
    userModel.getUserById(id, (err, user) => {
      if (err) throw err;
      res.render('info', user);
    });
  },
  getEditPage(req, res) { // 展示编辑页面
    var id = req.query.id;
    userModel.getUserById(id, (err, user) => {
      if (err) throw err;
      res.render('edit', user);
    });
  },
  editUserInfo(req, res) { // 编辑用户数据
    var newUser = req.body;
    userModel.editUserInfo(newUser, (err, result) => {
      if (err) throw err;
      res.json({ err_code: 0 });
    });
  },
  deleteUserById(req, res) { //根据Id删除用户
    var id = req.query.id;
    userModel.deleteUserById(id, (err, result) => {
      if (err) throw err;
      // 重新获取最新的列表数据，交给浏览器去进行客户端渲染
      userModel.getAllUsers((err, users) => {
        if (err) throw err;
        res.json({ err_code: 0, users: users });
      });
    });
  }
}