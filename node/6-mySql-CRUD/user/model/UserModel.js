// 用户Model
var connection = require('./baseDb.js');

module.exports = {
  getAllUsers(callback) { // 获取所有用户
    connection.query('select * from users where isdel=0 order by id', (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  addUser(user, callback) { // 添加新用户
    connection.query('insert into users set ?', [user], (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  },
  getUserById(id, callback) { // 根据Id查找用户
    // 参数化查询
    connection.query('select * from users where id=?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
  editUserInfo(user, callback) { // 编辑用户数据
    connection.query('update users set ? where id=?', [user, user.id], (err, results) => {
      if (err) return callback(err);
      callback(null, results)
    });
  },
  deleteUserById(id, callback) { // 根据Id删除用户
    connection.query('update users set isdel=1 where id=?', [id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  }
}