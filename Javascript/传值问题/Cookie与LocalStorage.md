# cookie
> 也是用来存储数据了  
> 它存储的数据不会一直保存! 
## 特性1: 
> 默认情况,关闭浏览器，cookie值会被自动删除！
> 我们可以指定让浏览器何时自动将cookie将
> 我们只需要指定一个时间，如果电脑时间超过我们设置的时间，浏览器就会把cookie删除
> 有一个额外的建议，cookie中不建议存储大量的数据! 

## 特性2:
- cookie存储的量一个网站4k:
- 关键是cookie会随着请求被浏览器【自动】发给服务器端!
- > 只要是请求，就会被发给服务器!

## expires(cookie过期时间)
```js
  // 此时，只有当电脑时间超过我们设置的这个时间时，浏览器才会自动删除这个数据
  // 格式时间
  // 获取当前时间往后10秒的时间
  var dt = new Date(Date.now() + 10*1000)
  var dtStr = dt.toGMTString()
  document.cookie = "sex=18;expires=" + dtStr
```


## 使用jquery来操作cookie
> 使用jquery插件: jquery.cookie来操作cookie  
> 如果用npm 下载这个插件的话 `npm install jquery.cookie`  

```js
  // 引入jquery.cookie之后，$会多出一个cookie的方法
  // 用这个方法来操作cookie
  // $.cookie方法
  // 1.设置一个cookie
  // 参数1: 设置cookie的key
  // 参数2: 设置cookie的value
  // 参数3: 可以做一些配置
  $.cookie('age', '99998', {
    // expires: new Date(Date.now() + 1*1000) 这是可以的,过期是1秒
    expires: 7 // 过期时间是7天
  })
  
  // 如果只传入一个参数，就是获取某个值!
  var a = $.cookie('age')
  console.log(a)

案例： 退出登陆 把登陆时的储存的数据PHPSESSID删除 设置存储时间为当前时间就可以删除

     $('.header .fa-sign-out').closest('a').on('click',function(){
        
        // 把登录时相应的数据PHPSESSID删除
        // 把cookie存储的时间设置成当前时间 就可以删除了
        var date = new Date();
        // date.setTime(date.getTime()) 
        $.cookie('PHPSESSID','aa',{
            expires:date,
            path:'/'
        });
        location.href = "/views/index/login.html";


    })


```
## 使用
- document.cookie 属性
> 当我们给这个属性赋值，就是存储了cookie,也是key,value的形式

```js
// 存储数据到cookie中
  var age = 18
  var sex = '女'

  // 赋值就能存储
  // document.cookie = 'myaeg=18'
  // 重新赋值不会赋值，之前设置的值!
  // document.cookie = 'myage=' + 18
  
  window.alert(1)
  // 如果只是改变=号右边，最终改变的是value值，不会添加一个新的数据!
  document.cookie = 'myage=998'
```

## 获取值

```js
// 这句话会把之前，设置过的，没有删除的所有的cookie值都获取到!
  var a = document.cookie
  var a = document.cookie // 获取
```

# localStorage(本地存储)
> 就是用来存储数据了  
> 数据不是在服务器存储了,而是在浏览器中存储  
> 在A浏览器中存储的，只能在A浏览器中获取！  
> 硬盘 
> 通过localStorage存储的数据会一起存在，除非我们手动删除
> 如果存储对象的话，要把对象转换为字符串(JSON.stringify)，再存储!   

## 存储数据
> window.localStorage
> window.localStorage.setItem(key, value)  
> window.lcoalStorage.setItem('name', '小明')
> window.localStorage.setItem('age', '18')

## 获取数据
> window.localStorage.getItem('name')

<!--ajax-->