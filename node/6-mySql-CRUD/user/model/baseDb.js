// 这里面写数据库连接的代码，然后返回一个 具体的 数据库连接对象
var mysql = require('mysql');

var connection = mysql.createConnection({
  database: 'my123',
  user: 'root',
  password: '123456'
});

module.exports = connection;