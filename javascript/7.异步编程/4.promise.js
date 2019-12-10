const fs = require('fs');
const path = require('path'); // 后面获取文件路径时候会用到
const readFilePromise = function(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err); // 注意，这里执行 reject 是传递了参数，后面会有地方接收到这个参数
      } else {
        resolve(data.toString()); // 注意，这里执行 resolve 时传递了参数，后面会有地方接收到这个参数
      }
    });
  });
};

const fullFileName = path.resolve(__dirname, '../../mock/todo.json');
const result = readFilePromise(fullFileName);
result
  .then(data => {
    // 第一步操作
    console.log(data);
    return JSON.parse(data)[0]; // 这里将 a 属性的值 return （如果返回的是 Promise 的话在下一个链式then中接受 ）
  })
  .then(a => {
    // 第二步操作
    console.log(a); // 这里可以获取上一步 return 过来的值
  })
  .catch(err => {
    console.log(err.stack); // 这里的 catch 就能捕获 readFilePromise 中触发的 reject ，而且能接收 reject 传递的参数
  });
