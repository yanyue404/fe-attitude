var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'my123'
})

connection.connect();

getAllUsers(function(err,data){
  if(err) throw err;
  console.log(JSON.stringify(data))
})
function getAllUsers(callback){ // 获取所有用户
  connection.query('select * from users where isdel=0 order by id', (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}