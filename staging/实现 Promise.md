- Promise 构造函数
- 静态方法
  - all
  - allSettled
  - any
  - race
  - reject
  - resolve

```js
class Promise__fake {
  constructor(executor) {
    this.status = "pending";
    this.handleFulfilled = []; // 存储成功后的回调
    this.handleRejection = []; // 存储失败后的回调
    // ! resolve 形参的实际参数在这儿
    const resolve = (data) => {
      // 状态变更只有一次
      if (this.status !== "pending") {
        return;
      }
      this.status = "fulfilled";
      // ! 等一会，否则 handleFulfilled 为空
      setTimeout(() => {
        this.handleFulfilled.forEach((fn) => fn(data));
      }, 0);
    };
    const reject = (reason) => {
      if (this.status !== "pending") {
        return;
      }
      this.status = "rejected";
      setTimeout(() => {
        this.handleRejection.forEach((fn) => fn(reason));
      }, 0);
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      // 遇到错误时，捕获错误，执行 reject 函数
      reject(e);
    }
  }
  then(fulfilledFn, rejectedFn) {
    this.handleFulfilled.push(fulfilledFn);
    this.handleRejection.push(rejectedFn);
    return this;
  }
}

//1. 链式测试
var p1 = new Promise__fake(function (resolve, reject) {
  console.log("init Promise");
  if (Math.random() > 0.5) {
    resolve("大");
  } else {
    reject("小");
  }
});
p1.then(
  (data) => console.log("success", data),
  (reason) => console.log("error", reason)
).then(
  () => console.log("success 2"),
  () => console.log("error 2")
);

// 2. 延时测试
var sleep = (time, data) =>
  new Promise__fake(function (resolve, reject) {
    setTimeout(resolve, time, data);
  });
sleep(3000, "时间到！").then((val) => {
  console.log(val);
});

// 3. 状态变更后不可变
const p2 = new Promise__fake(function (resolve, reject) {
  resolve("失败了！");
  reject("还会成功吗！");
});
p2.then(
  (data) => console.log(data),
  (reason) => console.log(reason)
);

(() => {
  var promise1 = 41;
  var promise2 = 42;
  var promise3 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 5000, "foo");
  });
  var promise4 = new Promise(function (resolve, reject) {
    setTimeout(reject("[err]: 模拟错误"), 300);
  });

  function p1(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(time);
      }, time);
    });
  }

  // Promise 扩展
  Promise.all__fake = (promiseAry) => {
    return new Promise((resolve, reject) => {
      let resultAry = [],
        index = 0;
      for (let i = 0; i < promiseAry.length; i++) {
        Promise.resolve(promiseAry[i])
          .then((result) => {
            index++;
            resultAry[i] = result;
            if (index === promiseAry.length) {
              resolve(resultAry);
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      }
    });
  };

  Promise.all__fake([promise1, promise2, promise3]).then(function (values) {
    console.log(values); //  [41, 42, 'foo']
  });
  Promise.all__fake([promise4, promise2, promise3]).then(function (values) {
    console.log(values); // Uncaught (in promise) [err]: 模拟错误
  });
  Promise.all__fake([p1(5000), p1(1000)]).then(function (res) {
    console.log(res); //[5000,1000]
  });
})();

class Promise2 {
  #status = "pending";
  constructor(fn) {
    this.q = [];
    const resolve = (data) => {
      this.#status = "fulfilled";
      const f1f2 = this.q.shift();
      if (!f1f2 || !f1f2[0]) return;
      const x = f1f2[0].call(undefined, data);
      if (x instanceof Promise2) {
        x.then(
          (data) => {
            resolve(data);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    };
    const reject = (reason) => {
      this.#status = "rejected";
      const f1f2 = this.q.shift();
      if (!f1f2 || !f1f2[1]) return;
      const x = f1f2[1].call(undefined, reason);
      if (x instanceof Promise2) {
        x.then(
          (data) => {
            resolve(data);
          },
          (reason) => {
            reject(reason);
          }
        );
      } else {
        resolve(x);
      }
    };
    fn.call(undefined, resolve, reject);
  }
  then(f1, f2) {
    this.q.push([f1, f2]);
  }
}

const p = new Promise2(function (resolve, reject) {
  setTimeout(function () {
    reject("出错");
  }, 3000);
});

p.then(
  (data) => {
    console.log(data);
  },
  (r) => {
    console.error(r);
  }
);
```
