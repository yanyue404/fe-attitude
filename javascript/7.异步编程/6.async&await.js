const Q = require('q');
const fs = require('fs');
const path = require('path');

// 封装了一个fs.readFile的promise生成器
const readFilePromise = Q.denodeify(fs.readFile);

const sleep = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

// 定义 async 函数
const readFileAsync = async function() {
  console.time('readFileAsync');
  await sleep(1000);
  let fileUrl = path.resolve(__dirname, '../../mock/todo.json');
  const f1 = await readFilePromise(fileUrl);
  const f2 = await readFilePromise(fileUrl);
  console.log('data1.json', f1.toString());
  console.log('data2.json', f2.toString());
  console.timeEnd('readFileAsync');
  return 'done';
};
// 执行
const result = readFileAsync();

result.then(res => {
  console.log(res); // dene
});
