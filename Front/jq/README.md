[TOC] 

$("#target1").prop("disabled",true);
## JQ对象与Dom对象
JQ转化为dom对象 1.角标[] $dom[0] 2.get方法 $dom.get(0)

dom转化为JQ对象 $dom()
一个页面可以写dom对象的API及方法,也可以写JQ对象的API及方法;

## 选择器
1. 基本 #(id) .(class) .(交集) ,(并集)

2. 层级选择器
3. 
(1) 加空格,包含选择器,获取所有的后代

(2) prev ~ siblings 匹配 prev 元素之后的所有 siblings 元素
siblings 作为第一个选择器的同辈

(3)>获取子元素,不包括子孙

(4) prev + next 匹配所有紧接在 prev 元素后的 next 元素
next 一个有效选择器并且紧接着第一个选择器

3过滤选择器

:first $("p:first") 第一个 <p> 元素

:last

:first-Child 1.获取当前元素父元素下的第一个子元素 2.必须为li元素

:even $("tr:even") 所有偶数 <tr> 元素

:odd

:eq $("ul li:eq(3)") 列表中的第四个元素（index 从 0 开始）

4.属性选择器

   $("input[type]")
   
$("input[type=but]")

$("input[type^=but]") 开始

$("input[class|=btn]") 开始 class="btn-success"

$("input[class|=btn]") 开始 class="btn-success"

$("input[class$=tiv]") 结尾

$("input[class*=active]") 查找所有类名 包含 'active' 的 input 元素

- 选择器里面常见的方法
next() 获取当前元素的下一个兄弟节点

prev() 获取当前元素的上一个兄弟节点

siblings() 获取当前元素的兄弟节点

parent() 获取当前元素的父元素

parents() 获取当前元素的所有父元素(如果不添加参数,获取所有,添加参数,可以获取指定的父元素)

children() 获取到当前元素的所有子元素(如果不添加参数,获取所有,添加参数,可以获取指定的子元素)

find() 获取当前元素下面的子元素()

eq() 获取到当前选择器选中的元素,根据索引再次进行查找;

index();获取当前元素的索引值


## dom元素的方法 



### 样式操作
1.css("backgroundColor","green");(必须加引号)
  css({"backgroundColor":green,"fontSize":"20px"});
  css("backgroundColor") 根据样式名获取该样式值
  
2.addClass(); addClass("active");

3.removeClass();不加参数,移除当前元素上的所有样式,添加参数就是移除当前元素上的指定样式

4.hasClass();判断当前元素是否存在某个类名,true/false

5.toggleClass("active");切换类名,判断当前元素是否存在active类名,如果存在就删除,不存在就添加
toggleClass("active hide");两个来回切换

### 动画
1. show() hide() 显示隐藏
一个参数 (1000) 显示时间1秒 fast 200 nomal 400 slow 600
两个参数(3000,function(){alert("a")});回调函数,动画结束 后执行
toggle(1000,function(){}) 切换
底层(width,height,display)

2. fadeIn() fadeOut() 淡入淡出
fadeToggle(1000,function(){})切换
fadeTo(时间,opacity,function(){}); 淡淡的达到
底层(opacity)

3. slideUp() slideDown() 向上滑动展开/向下滑动收起
sclideToggle(1000,function(){}) 切换
底层(height,display)

-  自定义动画(执行动画的值必须是数字)
animate({"width":"400px","height":"30px","margin-left":"200px"},3000)

    stop() 停止动画 (记得清除动画,用户可能多次点击,多次触发)
没有参数,只是停止当前正在执行的动画
stop(true,false);两个参数,
第一个参数为true清除所有动画,包括队列里的,为false只是停止当前的动画
第二个参数为true,直接跳回到当前元素指定动画结束后的状态,false,立即停止动画,不会回 到当前元素指定动画结束后的状态

### 节点,元素,属性
append() 往当前元素内的最后添加一个元素,被追加的会被剪切

appendTo() 将当前元素追加到指定元素内部的后面

prepend() 往当前元素内的前面添加一个元素,被追加的会被剪切

prependTo() 将当前元素追加到指定元素内部的后面

before()往当前元素的外部的前面追加一个指定元素,被指定的元素会被剪切

after() 往当前元素的外部的后面追加一个指定元素,被指定的元素会被剪切

html() 无参:获取到当前元素里面的所有内容,包括标签
设置参数:将当前元素里面的所有内容进行替换

text() 无参: 获取到当前元素里面的所有文本,包括子元素的文本(不加标签)
设置参数:将当前元素里面的所有内容进行替换

清空元素

empty()  仅清空当前元素里面的所有内容

remove() 删除当前元素以及当前元素里面的所有内容

克隆元素

clone() 无参,返回当前元素的一个副本(默认false)
有参数(true/false) true深层克隆,可以克隆JS事件

属性操作

attr() 一个参数,根据属性名去获取对应属性的值
两个参数,根据属性名去设置对应的属性值(覆盖)

removeAttr() 根据属性名去删除属性

prop() 一个参数 ,用来操作表单上的无值属性,根据属性名去获取对应属性的值
两个参数,根据属性名去设置对应的属性值

val() 无参,获取当前元素对应的value属性的值
一个参数,设置当前元素对应的value属性的值

宽高

width()/height() 无参,获取宽高(没有单位)
两个参数,设置 1.width(20) 2.width("20") 3.width("20px")

### 坐标操作

offset() 无参,返回的是对象{"width":100","",""}
设置位置,加参,里面的参数是一个对象 offset({"left":250, "top": 45})
延迟执行

delay() 延迟多少秒后执行后面的业务逻辑,可以等价 window.setTimeout(function (){});

### 绑定事件

1.$("div").click(function(){})

2.bind();可以给当前元素本身绑定事件,而且可以一次绑定多个事件(不支持给动态添加的元素添加事件)
$("div button").bind("click mouseover",function(){
alert("1");
});

3.delegate(); 事件委托必须通过父元素给子元素委派事件(可以给动态创建的元素绑定事件)
$("div").delegate("p","click",function(){
alert("事件被触发.");
})
只能给子元素添加事件,不能给元素本身添加事件

4.on(); 可以给当前元素绑定事件,也给动态添加的元素绑定事件
$("button:eq(0)").on("click",function(){
alert("给自己绑定的事件.");
})
$("div").on("click","p",function(){
alert("给p委派的事件");
});

click()不加参数就是触发点击事件

解绑事件 off() 不加参数解绑当前元素上所有的事件
加参数解绑当前元素上指定的的事件

给body下的div绑定代理事件
解绑代理事件$("body").off("click","div")

### 事件种类
mouseover和mouseenter区别
mouseover/leave的子元素也会被绑定该事件
mouseenter/out的子元素没有该事件

去掉当前元素空格
$.trim($(""))

监听滚动条的滚动
$(window).scroll(function)

### 链式操作
 调用的前提必须返回的是JQ的对象 (animate(),show(),hide(),
一般的过滤选择器,prevAll(),nextAll(),
text(加参数)?)

end 回到当前正在操作的元素的上一个元素

each隐式迭代 这个方法的目的是遍历当前元素。
//这个当前是一个jQuery 对象，是一个数组
//这个数组里面有多少个元素，function 就会执行多少次
/*
* index 当前dom 元素的索引值
* dom 当前数组里面的dom 对象
* */
$divs.each(function(index,dom){if(index==1){
dom.style.backgroundColor="green";
$(dom).css("opacity",(index+1)/10);
})

多库共存

自定义插件
局部,全局


jq里面的两种类型的方法;
1.全局:功能方法
2.局部:dom元素的方法



