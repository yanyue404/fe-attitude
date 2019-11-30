## Ajax

AJAX 指异步 JavaScript 及 XML（Asynchronous JavaScript And XML）

- 获取数据,存储数据,处理数据,生成视图

  - localStorage 和 sessionStorage
  - cookie
  - 模板引擎

- 接口化开发

1.  ajax 实现过程
    (1)创建 XMLHttpRequest 对象,也就是创建一个异步调用对象.
    (2)创建一个新的 HTTP 请求,并指定该 HTTP 请求的方法、URL 及验证信息.
    (3)设置响应 HTTP 请求状态变化的函数.
    (4)发送 HTTP 请求.
    (5)获取异步调用返回的数据.
    (6)使用 JavaScript 和 DOM 实现局部刷新.

2.  请求方式 + 原生 js + jquery + jsonp 支持 get(非 ajax 请求) + cors 支持 post
    > ajax 的技术使得前端可以拿到数据,促成了 web2.0 的诞生,也使得前端变得不再简单.

###同步与异步

### 同源与跨域

###实际请求

jsonp 动态创建 script src
cors 支持 post
ajax 过程
(1)创建 XMLHttpRequest 对象,也就是创建一个异步调用对象.
(2)创建一个新的 HTTP 请求,并指定该 HTTP 请求的方法、URL 及验证信息.
(3)设置响应 HTTP 请求状态变化的函数.
(4)发送 HTTP 请求.
(5)获取异步调用返回的数据.
(6)使用 JavaScript 和 DOM 实现局部刷新.

优点：
（1）通过异步模式，提升了用户体验.
（2）优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.
（3）Ajax 在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
（4）Ajax 可以实现动态不刷新（局部刷新）
缺点：
（1）安全问题 AJAX 暴露了与服务器交互的细节。
（2）对搜索引擎的支持比较弱。
（3）不容易调试。
（Q2）jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面。

###get 请求与 post 请求的区别

> get 一般用来查询操作,url 地址有长度限制,请求的参数都暴露在 url 地址栏中,如果传递中文参数,需要自己进行编码操作,安全性较低.

> post 请求主要用来提交数据,没有数据长度的限制,提交的数据内容存在于 http 请求体中,数据不会暴露在 url 地址栏中.

### 异步方法加载 js 文件

(1) defer,只支持 IE HTML4.01 defer="defer"
(2) async HTML5 中 async
(3) 动态创建 script 标签

按需异步载入 js

### 单线程与多线程

js 是单线程的,浏览器是多线程的
解决异步回调深层嵌套的问题 promise 对象 (resove,reject)

- ES6 中的 fetch 将会代替 ajax (react) get/post/上传文件

- vue 推荐使用不建议使用 router-resource,建议使用 Axios

>

    ```
      简单使用
    （1）get请求
     fetch("/data.json").then(function(res) {
     // res instanceof Response == true.
    if (res.ok) {
    res.json().then(function(data) {
      console.log(data.entries);
    });
    } else {
    console.log("Looks like the response wasn't perfect, got status", res.status);
    }
    }, function(e) {
    console.log("Fetch failed!", e);
    });

>

    fetch('http://nero-zou.com/test.json')
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err)=> {
        console.error(err)
    })

>

    （2）post请求
    fetch('/users', {
    method: 'post',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
     },
    body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
    })
    })

>

    fetch("http://www.example.org/submit.php", {
     method: "POST",
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "firstName=Nikhil&favColor=blue&password=easytoguess"
    }).then(function(res) {
    if (res.ok) {
    alert("Perfect! Your settings are saved.");
     } else if (res.status == 401) {
    alert("Oops! You are not authorized.");
    }
    }, function(e) {
    alert("Error submitting form!");
    });
    （3）上传文件
    var input = document.querySelector('input[type="file"]')
    var data = new FormData()data.append('file', input.files[0])data.append('user', 'hubot')
    fetch('/avatars', {
    method: 'post',
     body: data
    })


    ```
