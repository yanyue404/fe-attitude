# HTML5

[HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)

### 新增语义化标签

| 标签                                   | 作用                     |
| -------------------------------------- | ------------------------ |
| `<header></header>`                    | 头部标签                 |
| `<nav></nav>`                          | 导航标签                 |
| `<section class=”containt”></section>` | 块区域标签 可以当 div 用 |
| `<article></article>`                  | 文章                     |
| `<aside></aside>`                      | 侧边栏                   |
| `<figure></figure>`                    | 独立的流内容             |
| `<figcaption></figcaption>`            | 独立流内容的标题         |
| `<fieldset><fieldset>`                 | 表单区域                 |
| `<legend><legend>`                     | 表单区域标题             |
| `<footer></footer>`                    | 底部                     |

ie9 以下认识 h5 标签   （引入一个只有 ie9 以下认识的脚本）

```
<!--[if lte IE 8]> <script src=”html5shiv.min.js”></script><![endif]-->
```

## 智能表单

### 1.输入类型表单:type 属性

| 类型                                                | 作用                                                   |
| --------------------------------------------------- | ------------------------------------------------------ |
| url                                                 | 网址                                                   |
| email                                               | 邮箱                                                   |
| tel                                                 | 电话                                                   |
| `<input type=”number” max=”100” min=”1” step=”5”/>` | 数字(max//最大值   min//最小值 step//步长)             |
| `<input type=”range” max=”100” min=”1” step=”5”/>`  | 滑动块                                                 |
| color                                               | 取色器                                                 |
| time                                                | 时间（小时与分钟）                                     |
| date                                                | 时间 （年、月、日）默认时间格式 value=”2017-04-12”     |
| datetime-local                                      | 时间 （年、月、日、时、分）                            |
| month                                               | 时间 （年、月）                                        |
| week                                                | 时间 （年、周(某年的第几周)）                          |
| search                                              | 带有语义 下拉菜单 通常配合 datalist 用                 |
|  `<input type=”file” multiple=”multiple”>`          | 选择文件 属性 multiple 可以实现多选 多选时按住 ctrl 键 |

### 2.表单元素:

a) datalist 数据列表 (加 id 名在 input 里写的 list = "绑定")

>     search 类型的input标签  类似于text标签 特点具有语义化

    	一般也是配合 datalist一起使用

```
	<input type="search" name="" list="data">
<datalist id="data">
<option value="汽车"></option>
<option value="火车"></option>
<option value="飞机"></option>
</datalist>
```

b)      `<meter ></meter>`             度量器（进度条）

```
<meter max=”100” low=”60” high=”80”></meter>
```

max//最大值 low//最低值 low//中间值

c) `<progress></progress>` 进度条

```
   <progress  max=”100” value=”50”></progress>
```

d) `<keygen />` 生成加密字符串

e) `<output>< /output>` 输出结果

### 3.表单属性:

| 类型                    | 作用                                                    |
| ----------------------- | ------------------------------------------------------- |
| palceholder             | 默认                                                    |
| `autofocus=autofocus`   | 获取焦点                                                |
| autocomplete            | 自动完成，用于 form 元素，也可用于部分 input，默认值 on |
| multiple                | 多选                                                    |
| required                | 必填验证                                                |
| pattern                 | 正则验证                                                |
| novalidate              | 取消所有表单验证功能                                    |
| min/max/step            |
| list                    | 规定输入域的 datalist                                   |

### 4.事件:

onchange
oninput 输入的值变化的时候执行
多媒体标签
oninvalid 验证不通过时触发

## HTML5+CSS3+JS API 的技术组合

### DOM 扩展

#### 1.获取元素:

    querSelectorAll(选择器)(返回值永远是一个伪数组)
    var lis = document.querSelsecorAll("ul li.active");
    querySelector(选择器)(返回值永远都是找到的第一个)

#### 2.类名操作:

Node(有效的 dom 元素节点)
Node.classList.add("class");
Node.classList.remove("class");
Node.classList.toggle("class");切换
Node.classList.contains("class");判断有无

#### 3.自定义属性(以"data-"+名称 格式的标签)

    data-name = "jacob";
    设置
    Node.dataset["name"] = "jacob";
    获取
    console.log(Node.dataset["name"])
    值可以是aa-bb  但是获取的时候要驼峰获取 [aaBb]

## JS 的 API

### 1.网络状态

判断网络状态的方法 winow.navigator.onLine(返回值,true 在线,false 离线)

网络状态的监听

```
 online(在线事件) offline(离线事件)
 window.addEventListener("online",function(){
 alert("你已经联网")
 })
 window.addEventListener("offline",function(){
 alert("你已经断网")
 })

```

### 2.文件读取

input:file

a) files // 是 input type 类型为 file 选取的文件返回的一个伪数组

b) new FileReader() // 是一个文件读取器

c) result // 最终返回的值

d) readAsText() // 以文本格式的方式读取文件

e) readAsdataURL() // 以图片格式的方法读取文件

用法案例：

```
var ipt = document.querySelector(‘input’);
ipt.onchange = function(){                                                // 事件内容发生改变
var filelist = this.files;                                                    // 选取的文件的返回值 伪数组
var filereader = new FileReader();                           // 获取文件读取器
filereader.readAsText（或者）readAsDataURL(filelist[0]);          // 以哪种方法读取
filereader.onload = function(){                                  // 读取文件需要过程
var res = filereader.result;                                    // 最终返回值
img.src = res;                                                           // 图片应用
style.innerText = res;                                             // 文件应用
}
}
```

### 3.本地存储

```
a) localStorage    存储数据方式一

b) sessionStorage  储存数据方式二  （用法和方式一相同）

c) 两种方式的不同处

   i.     localStorage 是持久存储 不主动删除一直存在  可以多窗口共享

  ii.     sessStorage 是临时储存，关闭浏览器数据就没有了  不能多窗口共享数据

d) setItem(‘key’,’val’);   // 保存数据     语法：localStorage.setItem(‘属性’,’值’)；

e) getItem(‘key’);        // 获取数据      语法：localStorage.getItem(‘填写属性’)；

f) removeItem(‘key’);     // 删除数据      语法：localStorage.removeItem(‘填写属性’)；

g) clear();               // 清空数据      语法：localStorage.clear();
```

转换
//JSON.stringify(obj) 对象转字符串的方式
//JSON.parse(str) 字符串转换成对象

其他存储方式:
web SQL ,IndexedDB,Application Cath

### 4.地理定位

使用场景:基于用户设置开发互联网应用(基于网络位置的服务)LBS(Location Base Server)
获取方式:IP 地址,GPS,WiFi,手机信号,用户自定义
  
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

### 5.多媒体(视频和音频)

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

### 6.canvas

### 7.拖放

### 8.Web Workers

### 9.离线缓存
