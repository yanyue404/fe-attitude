// https://juejin.im/post/59e85eebf265da430d571f89
console.log('1');

// setTimeout1
setTimeout(function() {
  console.log('2');
  process.nextTick(function() {
    console.log('3');
  });
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('5');
  });
});

process.nextTick(function() {
  console.log('6');
});

new Promise(function(resolve) {
  console.log('7');
  resolve();
}).then(function() {
  console.log('8');
});

// setTimeout2
setTimeout(function() {
  console.log('9');
  process.nextTick(function() {
    console.log('10');
  });
  new Promise(function(resolve) {
    console.log('11');
    resolve();
  }).then(function() {
    console.log('12');
  });
});

// 第一轮
//  log: 1
// 宏任务 setTimeout1，setTimeout2
// 微任务
// process.nextTick 6
// new Promise（） log：7
// Promise.then 8
// 打印：1，7
// 微任务： 6,8

// 第二轮
// - setTimeout1
// log：2
// 宏任务：
// 微任务：
// process.nextTick（） 3
// log： 4
// 微任务加 Promise。then() 5

// - setTimeout2
// log: 9
// 微任务 + process.nextTick（） 10
// new Promise() log:11
// 微任务 + Promise.then() 12

// 打印 2,4,9,11

// 宏任务
// 微任务
// process.nextTick（） 3
// 微任务加 Promise。then() 5
// 微任务 + process.nextTick（） 10
// 微任务 + Promise.then() 12

// 第三轮打印

// 执行所用微任务
// 打印: 3,5,10,12

//  所有：1，7,6,8,
// 2,4,9,11
// 3,5,10,12
// 第二轮 setTimeout1
//       宏任务： 2 4
//       微任务: 3 5
// 第三轮 setTimeout2
//       宏任务：9 11
//       微任务：10 12

// node   在第二次执行宏任务时，宏任务全部执行完再执行微任务
// brower 在第二次执行宏任务时，一次执行宏任务，如:setTimeout1,setTimeout2
