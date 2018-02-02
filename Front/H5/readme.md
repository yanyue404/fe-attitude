# HTML5
[HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
### 新增语义化标签

标签 | 作用
---|---
`<header></header>` | 头部标签
`<nav></nav>` |导航标签
 `<section class=”containt”></section>`| 块区域标签  可以当div用
`<article></article> `|  文章                                                   
`<aside></aside>` |   侧边栏
`<figure></figure>` |  独立的流内容
`<figcaption></figcaption> ` | 独立流内容的标题
`<fieldset><fieldset> ` |  表单区域
`<legend><legend>  ` | 表单区域标题
`<footer></footer> ` | 底部

ie9以下认识h5标签   （引入一个只有ie9以下认识的脚本）

````
<!--[if lte IE 8]> <script src=”html5shiv.min.js”></script><![endif]--> 
````


## 智能表单

### 1.输入类型表单:type属性

类型 | 作用
---|---
url | 网址
email | 邮箱
tel | 电话
`<input type=”number” max=”100” min=”1” step=”5”/>` | 数字(max//最大值    min//最小值  step//步长)
`<input type=”range” max=”100” min=”1” step=”5”/>` | 滑动块
color | 取色器
time | 时间（小时与分钟）
date | 时间 （年、月、日）默认时间格式 value=”2017-04-12”
datetime-local | 时间 （年、月、日、时、分）
  month   | 时间 （年、月）
week     | 时间 （年、周(某年的第几周)）
search  | 带有语义 下拉菜单 通常配合datalist用
  `<input type=”file” multiple=”multiple”>`   | 选择文件 属性multiple 可以实现多选 多选时按住ctrl键

### 2.表单元素:
   datalist 数据列表 (加id名在input里写的list = "绑定")
   meter
   progress


 ### 3.表单属性:
 
 类型 | 作用
 ---|---
palceholder | 默认
autofocus   | 获取焦点
autocomplete | 自动完成，用于form元素，也可用于部分input，默认值on
multiple    | 多选
required     |必填验证
pattern     | 正则验证
novalidate   |取消输入域验证功能  
 min/max/step |
 list        | 规定输入域的datalist

   4.事件:
   onchange
   oninput 输入的值变化的时候执行
多媒体标签
   oninvalid 验证不通过时触发


HTML5+CSS3+JS API的技术组合

## DOM扩展
1.获取元素:
    querSelectorAll(选择器)(返回值永远是一个伪数组)
    var lis = document.querSelsecorAll("ul li.active");
    querySelector(选择器)(返回值永远都是找到的第一个)

2.类名操作:
    Node(有效的dom节点)
    Node.classList.add("class");
    ode.classList.remove("class");
    Node.classList.toggle("class");切换
    Node.classList.contains("class");判断有无

3.自定义属性(以"data-"+名称 格式的标签)
    data-name = "jacob";
    设置
    Node.dataset["name"] = "jacob";
    获取
    console.log(Node.dataset["name"])


## JS的API
1.网络状态

    判断网络状态的方法winow.navigator.onLine(返回值,true在线,false离线)

    网络状态的监听
    online(在线事件) offline(离线事件)
    window.addEventListener("online",function(){
    alert("你已经联网")
    })
    window.addEventListener("offline",function(){
    alert("你已经断网")
    })

2.文件读取

    input:file
    1.Filelist
    打印属性files返回值为Filelist返回读取到的文件列表(伪数组)
    2.FileRader 文件读取器 对象
    var filereader = new = FileReader();
    3.readAsText()
    //以文本格式读取文件
    filereader.readAsText (filelist[0]);
    //读取文件需要过程
    filereader.onload = function(){
    var res = filereader.result;
    console.log(res);
    }
    4.readDataURL()
    //在web页面中的图片能够显示出来,同时还不占用http链接

3.web存储

   1.cookie的特点
    //有一个键,同时对应一个值
    //通过";"来分割各个数据

    //缺点
    //需要自己手动写脚本处理数据
    //存储大小有的限制,一般4k

   2.Web Storage(WEB存储)
    h5新增localStorage约5M和sessionStorage约20M(两者的用法完全一致)
    h5的localStorage
    设置保存数据
    localStorage.setItem(key,value);
    获取数据
    getItem(key);
    删除数据
    removeItem(key);
    清除数据(完全)
    clearI()
    特点
        1.localStorage是永久存储,不主动删除,一直存储,sessionSorage是零时存储,关闭浏览器就没了
        2.localStorage可以多窗口共享,sessionSorage不可以多窗口共享数据
        3.容量约5M

    转换
    //JSON.stringify(obj) 对象转字符串的方式
    //JSON.parse(str) 字符串转换成对象

    其他存储方式:
    web SQL ,IndexedDB,Application Cath

    serializeArray() jq中的方法主要是获取表单中的数据(需要有name属性),好处是转化成数组了

4.地理定位
    使用场景:基于用户设置开发互联网应用(基于网络位置的服务)LBS(Location Base Server)
    获取方式:IP地址,GPS,WiFi,手机信号,用户自定义
    1.获取当前地理位置信息
    window.navigayor.goelocation.getCurrentPosition(successCallBack,errorCallBack)
    获取位置成功或失败的回调函数
    //定义成功的回调函数
    function successCallBack(position){
    console.log(position);
    //coords位置
    经度:var longigude = position.coords.longigude
    纬度:var latitude = position.coords.latitude
    }
    2.获取实时地理信息
    window.navigator.geolocation.watchPosition(successCallBack,errorCallBack)

    3.应用
    百度地图应用

5.多媒体(视频和音频)

     属性
     duration 总时长(获取到的是秒,需要转换)
     currentTime  当前播放的时间长度
     paused 是否暂停

     方法
     play()   播放
     pause() 暂停

          //播放功能
            if(video.paused){
                video.play();
            }else{
                video.pause();
            }
     事件
         oncanplay 当音频/视频能够播放时触发的事件
         ontimeupdate 当音频/视频播放过程中,时间发生变化时触发的事件
      全屏
     //方法
     requsetFullScreen();
     谷歌: webkitrequsetFullScreen()
     火狐:mozrequsetFullScreen()
