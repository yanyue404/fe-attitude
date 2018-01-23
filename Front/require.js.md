
## RequireJS

### 模块化开发
> 什么是模块化 
> 针对某个语言，把一个大的文件，拆分成不同的小文件去写

## RequireJS解决的问题(作用)
// a.js  var age = 18 , console.log(tmp) // 不可以
// b.js  console.log(age) var tmp = 10   // 是可以的
-> 全局变量污染的问题
-> 连script都不用写, RequireJS 自动帮我们引入js代码到页面上!

## 基本使用
-> http://requirejs.org/
- 1. 可以通过官网或者npm 下载 RequireJS
- `npm install requirejs`

<!--1.引包-->
<!--RequireJS帮助我们引入了app.js文件-->
`<script data-main="./js/app.js" src="../node_modules/requirejs/require.js"></script>`
<!--2.在这个引入 RequireJS的标签上添加一个data-main属性，指定一个文件的路径-->

## RequireJS 定义模块的方式

```js
// console.log(123)
// RequireJS 包中提供了一个叫define的方法
// 第二个参数，是回调函数
// define方法内部会自动调用这个回调函数
define([], function () {
  // 推荐把代码写在这个回调函数里面
  // 因为函数有自己独立的作用域, 这里申明的变量，不会对全局产生影响!
  // 以后，代码就不要写在这个函数外面了
  console.log('哈哈')
  var a = 3
  console.log(a)
})
// console.log(11) 代码不推荐写在这里
```

## define方法 
> define用来定义一个模块
```js
// 参数1： 引入js的,可以引用多个
// 引入时 ./ 是相对于 引入RequireJS的html文件(data-main)
// 参数2: 回调函数，代码写在这个函数里面，当define所在js被加载时，函数会自动执行!
define([], function () {})
```

## define方法结论
> 如果A.js中引入B.js,那么B.js中回调函数的返回值会作用A.js回调函数的参数传递。 


## 实践
-要做一个计算器, 把加减少乘除的方法写到一个单独的js中
-其他的js如果想要用这个方法的，就引入该js就可以了

## 模块化概念!
- js, css , 
- 适合团队开发（不同的人操作不同的部分）
- 适合测试
- 适合后期维护
- 引入script的方式有些：全局变量污染, jquery.cookie 依赖于jquery

> define方法定义一个模块
### 引入入口模块
> data-main:  define中的 ./ 相对于引入RequireJS的html
> require([]) define中的 ./ 相对于当前文件本身

### RequireJS配置
> require.config({baseUrl:})
> baseUrl, 可以使得我们引入js的路径写得短一点 
```js
// 在引入模块之前调用一次
require.config({
  // 配置一个基础的路径
  baseUrl: './js' // 也是相对于引入RequireJS的html
 配置了baseUrl之后，在define方法中的文件路径 不要写./ 也不要写 后缀名.js
 最终生成的script标签的src = baseUrl + define中数组中的参数 + .js
})
```

### 我们可以配置给js路径起个别名

```js
  require.config({
    baseUrl: './js',
    paths: {
      ximing: 'a/b/c/ff', // 也是没有./开头，也没有后缀 
      daming: 'a/c/e/gg
    }
  })

  // 这个define生成的script的src =  baseUrl + paths[ximing] + .js
  // define([ximing,daming])
```
## RequireJS引入第三方包
> 如果第三方包里的代码也使用define的方式，就和引用我们自己写的包的方式一样 
> 但是有些第三方包没有按照我们这种模块化的方式去写// bootstrap是依赖与jquery
> 假如是咱们开发bootstrap的话，可能会这么写
> define(['jquery'], function () {})  
> 但是bootstrap官方没有这么做，所以我们要配置让引入bootsrap时自动引入jquery
> 这需要通过一个叫shim的属性来配置

## 总结requirejs使用步骤
0. 下包(手动下载,npm, yarn, bower, jspm, nuget)
1. 引包
2. 配置
```js
require.config({
  // 例如，我引用了10个文件，但是这10个文件有相同的路径前缀，这个前缀可以在baseUrl中统一写
  // 限制: define中就不能写./ 也不能写 .js 后缀名了
  baseUrl: '/node_modules'
  paths: {
    // 纯粹是起个别名, 也叫模块id
    // 配置之后，在define写 a,和写 fff/fff/ff/jquery是等价
    a: 'fff/fff/ff/jquery
  },
  // 为什么要配置shim?
  // 1.因为我们引入的模块没有按照RequireJS这种模块化的写法去写,（就是说它里面没有define）
  // 2.因为我们引入的这个模块，还依赖其他模块, 不配置shim的话，其他模块不会被自动引入
  // 例子: 
  // 我们要使用boostrap,它不符RequireJS的模块化方式, 如果我们不配置shim，直接引用bootstrap,这个文件确实会被引入, 但是boostrap依赖于jquery, 这里的jquery不会被自动引入。
  // 所以要配置shim
  shim: {
    // 别名
    boostrap: {
      // deps表明 bootstrap依赖于谁
      deps: ['jquery'],

      // 如果boostrap中有全局变量, 我们可以给exports指定一个全局变量名

      // 假如bootstrap有个变量叫 Test，就可以写成 exports: 'Test'
      // 这样写的话,那么当我们引入bootstrap时
      //define(['bootstrap'], function (xx) {
      //  此时这个xx 的值就是这个Test的值
      //})
      exports: Test
    }
  }
})
```
3. 引入入口文件
