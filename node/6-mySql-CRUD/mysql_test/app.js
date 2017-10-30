// 导入操作MySql数据库的第三方模块
var mysql = require('mysql');

// 2. 创建一个数据库连接，在创建数据库连接的时候，必须要提供一个配置对象
// 这个对象身上，必须要有 数据库的名字、登录数据库的用户名 和 密码
var connection = mysql.createConnection({
  database: 'my123', // 指定要连接的数据库名称
  user: 'root', // 登录名
  password: '123456' // 登录密码
});

// 3. 使用创建的 connection 连接，去对数据库进行增删改查操作
// connection.query('sql语句', callback);


// // 查询数据
// var sql = 'select * from users';
// // 执行Sql语句，并得到结果
// connection.query(sql, (err, results) => {
//   if (err) throw err;
//   console.log(results); 
// });

// 更新数据
/* var sql = 'update users set age=12 where id=7';
connection.query(sql, (err, results) => {
  if(results.affectedRows===1){
    console.log('更新成功');
  }
}); */

// var sql = 'update users set age=' + 12 + ' where id=' + 7;
// 推荐使用参数化查询

/* var newUser = {
  id: 7,
  name: '哈哈',
  age: 38,
  gender: '女',
  address: '火星啊'
};

connection.query('update users set ? where id=?', [newUser, newUser.id], (err, results) => {
  console.log(err);
  if (results.affectedRows === 1) {
    console.log('更新成功');
  }
}); */

/*connection.query('update users set name=?, age=?, gender=?, address=? where id=?', [13, 7], (err, results) => {
  if (results.affectedRows === 1) {
    console.log('更新成功');
  }
});*/


// 插入数据
/* connection.query('insert into users (name, age) values (?,?)', ['小哈', 43], (err, results) => {
  console.log(results);
}); */


/*var newUser = {
  name: '哈哈2',
  age: 44,
  gender: '女',
  address: '金星'
};
connection.query('insert into users set ?', [newUser], (err, results) => {
  if (err) throw err;
  console.log(results);
});*/

// 删除数据
/* connection.query('delete from users where id=?', [7], (err, results) => {
  if (err) throw err;
  console.log(results);
}); */