
## 在线工具

### Adapter

<details>
<summary>View contents</summary>

* [base64 图片](http://tool.chinaz.com/tools/imgtobase)
* [HTML5 Please Use the new and shiny responsibly](http://html5please.com/)
* [兼容性速查](https://caniuse.com/)
* [在线配色选择器](http://www.peise.net/tools/web/)




* 渲染优化

  1.禁止使用 iframe（阻塞父文档 onload 事件）；
  *iframe 会阻塞主页面的 Onload 事件；
  *搜索引擎的检索程序无法解读这种页面，不利于 SEO;
  \*iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

            使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript
            动态给iframe添加src属性值，这样可以绕开以上两个问题。

  2.禁止使用 gif 图片实现 loading 效果（降低 CPU 消耗，提升渲染性能）；

  3、使用 CSS3 代码代替 JS 动画（尽可能避免重绘重排以及回流）；

  4、对于一些小图标，可以使用 base64 位编码，以减少网络请求。但不建议大图使用，比较耗费 CPU；小图标优势在于：

      1.减少 HTTP 请求； 2.避免文件跨域； 3.修改及时生效；

  5、页面头部的<style></style> 会阻塞页面；（因为 Renderer 进程中 JS 线程和渲染线程是互斥的）；

  6、页面头部<script</script> 会阻塞页面；（因为 Renderer 进程中 JS 线程和渲染线程是互斥的）；

  7、页面中空的 href 和 src 会阻塞页面其他资源的加载 (阻塞下载进程)；

  8、网页 Gzip，CDN 托管，data 缓存 ，图片服务器；

  9、前端模板 JS+数据，减少由于 HTML 标签导致的带宽浪费，前端用变量保存 AJAX 请求结果，每次操作本地变量，不用请求，减少请求次数

  10、用 innerHTML 代替 DOM 操作，减少 DOM 操作次数，优化 javascript 性能。

  11、当需要设置的样式很多时设置 className 而不是直接操作 style。

  12、少用全局变量、缓存 DOM 节点查找的结果。减少 IO 读取操作。

  13、避免使用 CSS Expression（css 表达式)又称 Dynamic properties(动态属性)。
  
  14、图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。

  15、 避免在页面的主体布局中使用 table，table 要等其中的内容完全下载之后才会显示出来，显示比 div+css 布局慢。对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘 IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如 join 查询），减少磁盘 IO 指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。
