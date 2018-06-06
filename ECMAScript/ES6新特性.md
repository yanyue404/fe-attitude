### 1.块级作用域
    <script>
    
    if(true){
        var color = 'green';
    }
    alert(color)  //green

    if(true){
        let Anothercolor = 'red'
    }
    alert(Anothercolor)  //报错
    </script>

  >常量const的作用域范围和let是一致的
  >
  >var命令存在变量提升效用，let命令没有这个问题。
  
  在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。这符合函数式编程的思想

   const声明常量还有两个好处，
  > 一是阅读代码的人立刻会意识到不应该修改这个值
  > 
  > 二是防止了无意间修改
变量值所导致的错误。


### 2.Promise对象(解决异步回调函数的深层嵌套问题)
    var promise = new Promise(function(resolve, reject) {
    // ... some code
    if (/* 异步操作成功 */){
    resolve(value);
    } else {
    reject(error);
    }
    });

 - 使用promise对象实现ajax的
  
    下面是一个用Promise对象实现的Ajax操作的例子。

----------


     var getJSON = function(url) {
     var promise = new Promise(function(resolve, reject){
    var client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
     function handler() {
    if (this.status === 200) {
    resolve(this.response);
    } else {
    reject(new Error(this.statusText));
    }
    };
    });
      return promise;
    };
    getJSON("/posts.json").then(function(json) {
    console.log('Contents: ' + json);
    }, function(error) {
    console.error('出错了', error);
    });

>使用Promise.prototype.catch()捕捉错误

    getJSON("/posts.json").then(function(posts) {
    // ...
     }).catch(function(error) {
    // 处理前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
    });

 ES6诞生以前，异步编程的方法，大概有下面四种。

 - 回调函数
- 事件监听
- 发布/订阅
- Promise 对象
### 3.模块化  Module
- export命令 用户自定义模块

可以用于输出变量,函数和类

    //profile.js
    //单个变量
    export var firstName = 'Michael';
    export var lastName = 'Jackson';
    export var year = 1958;
    
    //一组变量
     var firstName = 'Michael';
     var lastName = 'Jackson';
     var year = 1958;
     export {firstName, lastName, year};

    //导出函数
    export function multiply (x, y) {
    return x * y;
     };
- import 导入文件


>使用export命令定义了模块的对外接口以后，其他JS文件就可以通过import命令加载这个模块（文件）

    // main.js
    import {firstName, lastName, year} from './profile';
    function sfirsetHeader(element) {
    element.textContent = firstName + ' ' + lastName;
    }
>上面代码属于另一个文件main.js，import命令就用于加载profile.js文件，并从中输入变量。import命令接受一个对象（用大括号表示），里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（profile.js）对外接口的名称相同。


如果想为输入的变量重新取一个名字，import语句中要使用as关键字，将输入的变量重命名。

      import { lastName as surname } from './profile';

- 多重加载,即所加载的模块中又加载其他模块。



      import { Vehicle } from './Vehicle';
      class Car extends Vehicle {
      move () {
      console.log(this.name + ' is spinning wheels...')
      }
      }
      export { Car }
> 上面的模块先加载Vehicle模块，然后在其基础上添加了move方法，再作为一个新模块输出

- 模块的整体输入
  
> 下面是一个circle.js文件，它输出两个方法area和circumference。

     // circle.js
     export function area(radius) {
     return Math.PI * radius * radius;
     }
     export function circumference(radius) {
    return 2 * Math.PI * radius;
     }
 >然后，main.js文件输入circlek.js模块。
 
    // main.js 逐一输入
    import { area, circumference } from 'circle';
    console.log("圆面积：" + area(4));
    console.log("圆周长：" + circumference(14));
    
    //整体输入
    import * as circle from 'circle';
    console.log("圆面积：" + circle.area(4));
    console.log("圆周长：" + circle.circumference(14));
- module命令
> module命令可以取代import语句，达到整体输入模块的作用。

    // main.js
    module circle from 'circle';
    console.log("圆面积：" + circle.area(4));
    console.log("圆周长：" + circle.circumference(14));
> module命令后面跟一个变量，表示输入的模块定义在该变量上。

- export default命令 默认输出
> 一个模块只能有一个默认输出

   下面比较一下默认输出和正常输出。

     import crc32 from 'crc32';
    // 对应的输出
    export default function crc32(){}
    import { crc32 } from 'crc32';
    // 对应的输出
    export function crc32(){};

### 4.解构赋值
使用数组成员对变量赋值

    const arr = [1, 2, 3, 4];
    // bad
    const first = arr[0];
    const second = arr[1];
    // good
    const [first, second] = arr;
函数的参数如果是对象的成员，优先使用解构赋值

    // bad
    function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
    }
    // good
    function getFullName(obj) {
    const { firstName, lastName } = obj;
     }
    // best
    function getFullName({ firstName, lastName }) {
    }
如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以
及更改返回值的顺序。

    // bad
    function processInput(input) {
    return [left, right, top, bottom];
    }
    // good
    function processInput(input) {
    return { left, right, top, bottom };
    }
    const { left, right } = processInput(input);

### 5.数组扩展
使用扩展运算符rest运算符（...）拷贝数组。

    // bad
    const len = items.length;
    const itemsCopy = [];
    let i;
    for (i = 0; i < len; i++) {
    itemsCopy[i] = items[i];
     }
    // good
    const itemsCopy = [...items];
使用Array.from方法，将类似数组的对象转为数组。

    const foo = document.querySelectorAll('.foo');
    const nodes = Array.from(foo);
### 6.函数
箭头函数
>简洁,而且绑定了this,取代了Function.prototype.bind，不应再用self/_this/that绑定 this。

使用默认值语法设置函数参数的默认值。

    // bad
    function handleThings(opts) {
    opts = opts || {};
     }
    // good
    function handleThings(opts = {}) {
     // ...
    }



