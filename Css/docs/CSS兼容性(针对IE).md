CSS hack主要有三种:ie条件注释法,CSS属性前缀,选择器前缀法.

##1.IE条件注释法

      判断IE浏览器的范围： lt是小于  lte是小于或等于
                         gt是高于  gte 高于或等于
                         !是不等于
      语法：
      <!--[if gte ie 版本号]>要执行的代码<![endif]-->


      <!--[if gte ie 5]>
          <link rel="stylesheet" type="text/css" href="css/c.css">
      <![endif]-->
      
   > 注:只能采用外链的样式书写css代码

##2.CSS前缀hack	针对的浏览器
      _color:red;	IE6 专属
      *color	IE7 及其以下版本
      CSS后缀hack	针对的浏览器
      color:red\9;	IE6-IE10版本(不包含ie11 以下同样如此)
      color:red\0;	IE8/IE9/IE10版本
      color:red\9\0;	IE9/IE10
      color:red!important	IE7/IE8/IE9/IE10及其他非ie

##3.选择器前缀法
      IE6(含)以下的版本识别  *div {color:red;}
      IE7可识别             *+div {color:red;}

      媒体查询的写法（了解）

      @media screen\9{body { background: red; }}	只对IE6/7生效
      @media \0screen {body { background: red; }}	只对IE8生效
      @media \0screen\,screen\9{body { background: blue; }}	只对IE6/7/8有效
      @media screen\0 {body { background: green; }}	只对IE8/9/10有效
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }}	只对IE10有效

       总结兼容性

       其实，最好的兼容性还是要写符合标准的代码， 注意前面讲过的特殊属性，比如外边距合并，浮动脱标等等。

       非要使用css hack的话，要注意顺序千万不要乱，因为当出现重复定义时，浏览器默认按最后一下渲染，所以一定要先正常，再*，最后_。（先大      后小或者 先全局后局部）

###1.IE6双外边距浮动bug
  最常见且最容易发现的一个bug是ie6和更低版本中的双外边距bug.这个windows bug 会使任何浮动元素上的外边距加倍.
  解决方式:(1) display:inline,因为元素是浮动的,设置过后实际不会影响显示方式.每当对具有水平外边距的元素进行浮动的时候,都应和自然的将display属性设置为inline,以防备外边距将来被放大. (2) _margin-left:5px;

  同样的bug: 行内属性标签,为了设置宽高,设置成为disply:block;这样一来就产生了上面的问题
  解决办法:添加display;inline;但是这样一来就不能设置宽高了,所以需要再添加个display:table;
###2.IE6下元素最小高度的问题
   如果想把元素例如div设置成10px以下的高度设置不了,因为它有默认高度
   解决方法:  (1)overflow:hidden;(2) font-size:0; (3) line-height:0;
###3. IE7及更早浏览器下当li中出现2个或以上的浮动时，li之间产生的空白间隙的BUG

   解决方法:vertical-align:top; (middle | bottom 等都可以)
###4.IE6中奇数宽高的BUG
   子绝父相定位的盒子中父盒子的宽高为奇数会有1px的空白距离
  解决方案:将外部相对定位的div宽度改成偶数
###5.了解ie6盒子会撑高的特性
  ie下面的盒子， 即使你给与了宽度和高度，但是内容超过大小的时候，盒子还会撑大，解决方法就是添加overflow:hidden;
###6.3px 文本偏移bug
  windows上IE和IE6上的文本偏移3px的bug,当文本与一个浮动元素相邻的时候,这个bug就会表现出来.
  例如:假设一个元素向左浮动,并且不希望相邻段落中的文本环绕浮动元素,在段落上设置一个左外边距,其宽度等于浮动元素的宽度.
       这么做,在文本和浮动元素之间就会出现莫名其妙的3px的间隙,一旦浮动停止,3px像素的间隙也会消失.
  解决方法:(1) p { height:1%; margin-left:0}   .myFloat {margin-right:-3px;}
          (2) .myFloat { display:inline-block;} 
###7.外边距合并问题
     上下外边距重合问题
     解决方法:尽量避免此类设置布局
     嵌套块元素垂直外边距合并问题
     对于两个嵌套关系的的块元素,如果父元素没有上内边距和边框,则父元素的上外边距会和子元素的上外边距发生合并,合并后的外边距为两者中的较大者,即使父元素的上外边距为0,也会发生合并.
     解决方法:(1) 父元素定义1px 的上边框和上外边距
             (2) 为父元素加 overflow:hidden;

### 8.min-height不兼容
     .box ( min-height:100px;height:auto!important;height:100px;overflow:visible;s)
### 9.链接访问  L-V-H-A (爱恨原则)
### 10.chrome下默认会将小于12px的文本强制按照12px来解析
     解决办法:-webkit-text-size-adjust:none;

### 11.ie盒子模式和w3c标准模式

   ie6下的盒子模型的宽度高度都将padding,border,margin计算入盒子的宽高当中
   w3c标准下的盒子模型只有内容区
   比较设计而言ie的设计更科学,
      (1) 面板式界面设计 ie的盒子模型中,确立了盒子的尺寸之后,不论怎样调整padding和margin,都不会影响面板本身的结构.
                        w3c的盒子模型中,调整padding和margin,都会影响盒子模型的尺寸,在调整页面内容摆放位置时,极有可能打乱面板本身的结构.
      (2) 百分比级尺寸+像素边界的问题
                        w3c盒子模型下在一个不确定的宽度的容器,想在里面放置两个相同大小的盒子,最合理的办法是设置每个盒子的宽度为50%,这样两个盒子都可以自适应宽度,但前提是不要设置任何padding或border,而且为了防止两个盒子中的内容互相挨得太近,你肯定要设置padding,一旦设置了padding,就会发现容器撑破了.
                        ie盒子不需要多费周折,不管如何设置padding和border,都不会撑破容器

                        因此,在CSS3中,我们看到了box-sizing这个属性
                        其中的两个可选值,一个是默认的content-box,一个是border-box,选用后者,盒子模型将按照ie6的方式进行处理.


###12.css控制透明度的问题
      opacity:0.6;   IE就fillter:alpha(opacity=60);
      ie6下:filter:progid;DXImageTransform.Microsoft.Alpha(style=0,opacity=60);
      实现ie6下png图片透明问题
      filter:progid;DXImageTransform.Microsoft.AlphaImageLoader(src='png图片路径',sizingMethord='crop)
### 13.图片下方有一条空隙
    解决方法:
    给img vertical-align:middle | top等等, 让图片不要和基线对齐。
    给img 添加 display：block; 转换为块级元素就不会存在问题了。
###14.清除浮动,解决父级元素因为子级浮动引起内部高度为0的问题;
     (1) 额外标签法 在浮动元素的末尾添加一个空标签,如<div style="clear:both;"></div>,或其他标签br等亦可以
     (2) 父级添加 overflow:hidden; (auto | scroll 都可)
     (3) 使用伪元素清除 :after
          .clear:after {content:''; display:block: height:0; clear:both; visbility:hidden;}
          .clear { *Zoom:1}    ie67专用