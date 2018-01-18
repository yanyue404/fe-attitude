## 一.基本语法

### 0 插入文件

@import命令，用来插入外部文件。

````
　@import "path/filename.scss";
````

如果插入的是.css文件，则等同于css的import命令。
````
　@import "foo.css";
````
　

### 1 变量

SASS允许使用变量，所有变量以$开头。

````
$blue : #1875e7;　

　　div {
　　　color : $blue;
　　}
````

如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中。

````
$side : left;

　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}
````

### 2 计算功能

SASS允许在代码中使用算式：
````
body {
　　　　margin: (14px/2);
　　　　top: 50px + 100px;
　　　　right: $var * 10%;
　　}
````
　　

### 3 嵌套

SASS允许选择器嵌套。比如，下面的CSS代码：
````
　// #content article h1 { color: #333 }
    // #content article p { margin-bottom: 4px }
    // #content aside { background-color: #EEE }
````

可以写成：
````
　　 #content {
      article {
        h1 {
          color:#333;
        }
        p {
          margin-bottom: 4px;
        }
      }
      aside{
        background-color: #eee;
      }
    }
````

1.属性也可以嵌套，比如border-color属性，可以写成：

````
p {
　    border: {
　           color: red;
　      　　　}
　      　}
````

 >  注意，border后面必须加上冒号。

2.父选择器的标识符，可以使用&引用父元素。比如a:hover伪类，可以写成：
````
 　a {
　      　　　&:hover { color: #ffb3ff; }
　      　}
````
　     
3.子组合选择器 >(直接子元素选择器)
````
  // article > section { border: 1px solid #ccc }
         article{
           > section{
             border:1px solid #ccc;
           }
         }
````        
4.群组选择器的嵌套
````
    // .container h1, .container h2, .container h3 { margin-bottom: 8px }
          .container{
            h1,h2,h3{
              margin-bottom:8px;
            }
          }
````
           

### 4 注释

SASS共有两种注释风格。

标准的CSS注释 /* comment */ ，会保留到编译后的文件。

单行注释 // comment，只保留在SASS源文件中，编译后被省略。(静默注释)

在/*后面加一个感叹号，表示这是"重要注释"。即使是压缩模式编译，也会保留这行注释，通常可以用于声明版权信息。

````
　/*! 
　　　　重要注释！ 
　　*/
````

## 二.代码的重用

### 1 继承

SASS允许一个选择器，继承另一个选择器。比如，现有class1：
````
　.class1 {
　　　　border: 1px solid #ddd;
　　}
````

class2要继承class1，就要使用@extend命令：
````
　　.class2 {
　　　　@extend .class1;
　　　　font-size:120%; 
　　}
````
### 2 Mixin

Mixin有点像C语言的宏（macro），是可以重用的代码块。

使用@mixin命令，定义一个代码块。

````
　　@mixin left {
　　　　float: left;
　　　　margin-left: 10px;
　　}

````
使用@include命令，调用这个mixin。

````
div {
　　　　@include left;
　　}

````
mixin的强大之处，在于可以指定参数和缺省值。

````
　@mixin left($value: 10px) {
　　　　float: left;
　　　　margin-right: $value;
　　}
````

使用的时候，根据需要加入参数：
````
　div {
　　　　@include left(20px);
　　}

````
　
下面是一个mixin的实例，用来生成浏览器前缀.(设置了默认参数,可以更改)

````
　　@mixin rounded($vert, $horz, $radius: 10px) {
　　　　border-#{$vert}-#{$horz}-radius: $radius;
　　　　-moz-border-radius-#{$vert}#{$horz}: $radius;
　　　　-webkit-border-#{$vert}-#{$horz}-radius: $radius;
　　}

````
使用的时候，可以像下面这样调用：
````
　　#navbar li { @include rounded(top, left); }

　　#footer { @include rounded(top, left, 5px); }
````

### 3 颜色函数

SASS提供了一些内置的颜色函数，以便生成系列颜色。
````
　　lighten(#cc3, 10%) // #d6d65c
　　darken(#cc3, 10%) // #a3a329
　　grayscale(#cc3) // #808080
　　complement(#cc3) // #33c
````

## 三.高级用法

### 1 条件语句

@if可以用来判断：

````
　p {
　　　　@if 1 + 1 == 2 { border: 1px solid; }
　　　　@if 5 < 3 { border: 2px dotted; }
　　}
````

配套的还有@else命令：
````
　@if lightness($color) > 30% {
　　　　background-color: #000;
　　} @else {
　　　　background-color: #fff;
　　}
````

2 循环语句

SASS支持for循环：

````
　@for $i from 1 to 10 {
　　　　.border-#{$i} {
　　　　　　border: #{$i}px solid blue;
　　　　} 
　　}
````

也支持while循环：

````
　$i: 6;

　　@while $i > 0 {
　　　　.item-#{$i} { width: 2em * $i; }
　　　　$i: $i - 2;
　　}
````

each命令，作用与for类似：

````
　@each $member in a, b, c, d {
　　　　.#{$member} {
　　　　　　background-image: url("/image/#{$member}.jpg");
　　　　} 
　　}
````

### 3 自定义函数

SASS允许用户编写自己的函数。

````
@function double($n) {
　　　　@return $n * 2;
　　}

　　#sidebar {
　　　　width: double(5px);
　　}
````