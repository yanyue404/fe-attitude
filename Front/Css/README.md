## 在线工具
- [base64图片](http://tool.chinaz.com/tools/imgtobase)

### 常用代码段
- 清除浮动
````
 <!-- 1.额外标签法 -->
    <!-- 在浮动元素的末尾添加空标签 -->
    <div style="clear:both"></div>

    <!-- 2.父级添加overflow -->
    <!-- 设置overflow:hidden/auto/scroll都可 -->

    <!-- 3.使用after伪元素清浮动 -->
    <style>
        .clearfix:after {
            content: '';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }

        .clearfix {
            *zoom: 1;
            /* ie67专用 */
        }
    </style>

    <!-- 4.双伪元素清浮动 -->
    <style>
        .clearfix:before,
        .clearfix:after {
            content: '';
            display: table;
        }

        .clearfix:after {
            clear: both;
        }

        .clearfix {
            *zoom: 1;
        }
    </style>
````
- 文本溢出

 单行


````
    p {
        width: 200px;
        font-size: 20px;
        height: 40px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
 ````
  
   多行
  ````
 /*拓展*/
    /*跨浏览器兼容,设置相对定位的容器高度,用包含省略号的(...)的元素模拟实现*/
    p {
        position: relative;
        line-height: 1.4em;
        height: 4.2em;
        width: 201px;
        overflow: hidden;
    }
    p::after {
        content:"...";
        font-weight:bold;
        position:absolute;
        bottom:0;
        right:0;
        padding:0 20px 1px 45px;
        background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;

        /* 
        height高度真好是line-height的3倍；
       结束的省略好用了半透明的png做了减淡的效果，或者设置背景颜色；
       IE6-7不显示content内容，所以要兼容IE6-7可以是在内容中加入一个标签，比如用<span class="line-clamp">...</span>去模拟；
       要支持IE8，需要将::after替换成:after；
        
         */
    }
  ````
  - 全屏
  背景````
    *{margin:0;padding:0;}
  html{
  background:url("img/1.jpg") no-repeat center center;
  background-size:cover;
  min-height:100%;
  }
  ````
