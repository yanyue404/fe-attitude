## 大纲

- 从浏览器接收 url 到开启网络请求线程
  - 多进程的浏览器
  - 多线程的浏览器内核
  - 网络请求都是单独的线程
- 开启网络线程到发出一个完整的 http 请求
  - DNS 查询得到 IP
  - tcp/ip 请求
  - 五层因特网协议栈
- 从服务器接收到请求到对应后台接收到请求
  - 负载均衡
  - 后台的处理
- 后台和前台的 http 交互
  - http 报文结构
  - cookie 交互
  - gzip 压缩
  - 长连接与短连接
  - http 2.0
  - https
  - http 的缓存
- 解析页面流程
  - 流程简述
  - HTML 解析，构建 DOM
  - 生成 CSS 规则
  - 构建渲染树
  - 渲染
  - Chrome 中的调试
  - 资源外链的下载
  - loaded 和 domcontentloaded
- JS 引擎解析过程
  - 执行上下文
  - 作用域链
  - 事件循环机制

## 解析页面流程

前面有提到 http 交互，那么接下来就是浏览器获取到 html，然后解析，渲染

**这部分很多都参考了网上资源，特别是图片，参考了来源中的文章**

### 流程简述

浏览器内核拿到内容后，渲染步骤大致可以分为以下几步：

    1. 解析HTML，构建DOM树

    2. 解析CSS，生成CSS规则树

    3. 合并DOM树和CSS规则，生成render树

    4. 布局render树（Layout/reflow），负责各元素尺寸、位置的计算

    5. 绘制render树（paint），绘制页面像素信息

    6. 浏览器会将各层的信息发送给GPU，GPU会将各层合成（composite），显示在屏幕上

如下图：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_rending.png)

### HTML 解析，构建 DOM

整个渲染步骤中，HTML 解析是第一步。

简单的理解，这一步的流程是这样的：**浏览器解析 HTML，构建 DOM 树。**

但实际上，在分析整体构建时，却不能一笔带过，得稍微展开。

解析 HTML 到构建出 DOM 当然过程可以简述如下：

    Bytes → characters → tokens → nodes → DOM

譬如假设有这样一个 HTML 页面：（以下部分的内容出自参考来源，修改了下格式）

    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link href="style.css" rel="stylesheet">
        <title>Critical Path</title>
      </head>
      <body>
        <p>Hello <span>web performance</span> students!</p>
        <div><img src="awesome-photo.jpg"></div>
      </body>
    </html>

浏览器的处理如下：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_parse_html.png)

列举其中的一些重点过程：

    1. Conversion转换：浏览器将获得的HTML内容（Bytes）基于他的编码转换为单个字符

    2. Tokenizing分词：浏览器按照HTML规范标准将这些字符转换为不同的标记token。每个token都有自己独特的含义以及规则集

    3. Lexing词法分析：分词的结果是得到一堆的token，此时把他们转换为对象，这些对象分别定义他们的属性和规则

    4. DOM构建：因为HTML标记定义的就是不同标签之间的关系，这个关系就像是一个树形结构一样
    例如：body对象的父节点就是HTML对象，然后段略p对象的父节点就是body对象

最后的 DOM 树如下：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_parse_dom.png)

### 生成 CSS 规则

同理，CSS 规则树的生成也是类似。简述为：

    Bytes → characters → tokens → nodes → CSSOM

譬如`style.css`内容如下：

    body { font-size: 16px }
    p { font-weight: bold }
    span { color: red }
    p span { display: none }
    img { float: right }

那么最终的 CSSOM 树就是：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_parse_cssom.png)

### 构建渲染树

当 DOM 树和 CSSOM 都有了后，就要开始构建渲染树了

一般来说，渲染树和 DOM 树相对应的，但不是严格意义上的一一对应

因为有一些不可见的 DOM 元素不会插入到渲染树中，如 head 这种不可见的标签或者`display: none`等

整体来说可以看图：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_parse_rendertree.png)

### 渲染

有了 render 树，接下来就是开始渲染，基本流程如下：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_rendingprocess.jpg)

图中重要的四个步骤就是：

    1. 计算CSS样式

    2. 构建渲染树

    3. 布局，主要定位坐标和大小，是否换行，各种position overflow z-index属性

    4. 绘制，将图像绘制出来

然后，图中的线与箭头代表通过 js 动态修改了 DOM 或 CSS，导致了重新布局（Layout）或渲染（Repaint）

这里 Layout 和 Repaint 的概念是有区别的：

- Layout，也称为 Reflow，即回流（又叫重排）。一般意味着元素的内容、结构、位置或尺寸发生了变化，浏览器需要重新计算样式和渲染树
- Repaint，即重绘。意味着元素发生的改变只是影响了元素的一些外观之类的时候（例如，背景色，边框颜色，文字颜色等），此时只需要应用新样式绘制这个元素就可以了

回流的成本开销要高于重绘，而且一个节点的回流往往回导致子节点以及同级节点的回流， 所以优化方案中一般都包括，尽量避免回流。

**什么会引起回流？**

    1.页面渲染初始化

    2.DOM结构改变，比如删除了某个节点

    3.render树变化，比如减少了padding

    4.窗口resize

    5.最复杂的一种：获取某些属性，引发回流，
    很多浏览器会对回流做优化，会等到数量足够时做一次批处理回流，
    但是除了render树的直接变化，当获取一些属性时，浏览器为了获得正确的值也会触发回流，这样使得浏览器优化无效，包括
        （1）offset(Top/Left/Width/Height)
         (2) scroll(Top/Left/Width/Height)
         (3) cilent(Top/Left/Width/Height)
         (4) width,height
         (5) 调用了getComputedStyle()或者IE的currentStyle

回流一定伴随着重绘，重绘却可以单独出现

所以一般会有一些优化方案，如：

- **最小改动原则**，减少逐项更改样式，最好一次性更改 style（先设置元素隐藏后再展示），或者将样式定义为 class 并一次性更新
- **批量操作 DOM**，避免循环操作 dom，创建一个 `documentFragment` 或 div，在它上面应用所有 DOM 操作，最后再把它添加到 window.document，避免多次读取 offset 等属性。无法避免则将它们缓存到变量
- **将复杂的元素采用绝对定位或固定定位**，使得它脱离文档流，否则回流代价会很高
- **开启 GPU 加速**，利用 css 属性 `transform` 、`will-change` 等，比如改变元素位置，我们使用 `translate` 会比使用绝对定位改变其 left 、top 等来的高效，因为它不会触发重排或重绘，`transform` 使浏览器为元素创建⼀个 GPU 图层，这使得动画元素在一个独立的层中进行渲染。当元素的内容没有发生改变，就没有必要进行重绘。

再来看一个示例：

    var s = document.body.style;

    s.padding = "2px"; // 回流+重绘
    s.border = "1px solid red"; // 再一次 回流+重绘
    s.color = "blue"; // 再一次重绘
    s.backgroundColor = "#ccc"; // 再一次 重绘
    s.fontSize = "14px"; // 再一次 回流+重绘
    // 添加node，再一次 回流+重绘
    document.body.appendChild(document.createTextNode('abc!'));

**CSS 的<link>标签与 JS 的<script>标签在 html 中放置位置**

最好把 CSS 的`<link>`标签放在`<head></head>`之间，最好把 JS 的`<script>`标签恰好放在`</body>`之前。

把`<link>`放在`<head>`中

这种做法可以让页面逐步呈现，提高了用户体验。将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容。

把`<script>`标签恰好放在`</body>`之前

脚本在下载和执行期间会阻止 HTML 解析。把`<script>`标签放在底部，保证 HTML 首先完成解析，将页面尽早呈现给用户。

如果一定要放在 `<head>` 中，可以让 `<script>` 标签使用 defer 属性。

### Chrome 中的调试

Chrome 的开发者工具中，Performance 中可以看到详细的渲染过程：

![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_chrome_debug_1.png) ![](https://dailc.github.io/staticResource/blog/basicKnowledge/whenyouenteraurl/browser_chrome_debug_2.png)

### 资源外链的下载

上面介绍了 html 解析，渲染流程。但实际上，在解析 html 时，会遇到一些资源连接，此时就需要进行单独处理了

简单起见，这里将遇到的静态资源分为一下几大类（未列举所有）：

- CSS 样式资源
- JS 脚本资源
- img 图片类资源

**遇到外链时的处理**

当遇到上述的外链时，会单独开启一个下载线程去下载资源（http1.1 中是每一个资源的下载都要开启一个 http 请求，对应一个 tcp/ip 链接）

**遇到 CSS 样式资源**

CSS 资源的处理有几个特点：

- CSS 下载时异步，不会阻塞浏览器构建 DOM 树
- 但是会阻塞渲染，也就是在构建 render 时，会等到 css 下载解析完毕后才进行（这点与浏览器优化有关，防止 css 规则不断改变，避免了重复的构建）
- 有例外，`media query`声明的 CSS 是不会阻塞渲染的

**遇到 JS 脚本资源**

JS 脚本资源的处理有几个特点：

- 阻塞浏览器的解析，也就是说发现一个外链脚本时，需等待脚本下载完成并执行后才会继续解析 HTML
- 浏览器的优化，一般现代浏览器有优化，在脚本阻塞时，也会继续下载其它资源（当然有并发上限），但是虽然脚本可以并行下载，解析过程仍然是阻塞的，也就是说必须这个脚本执行完毕后才会接下来的解析，并行下载只是一种优化而已
- defer 与 async，普通的脚本是会阻塞浏览器解析的，但是可以加上 defer 或 async 属性，这样脚本就变成异步了，可以等到解析完毕后再执行

注意，defer 和 async 是有区别的： **defer 是延迟执行，而 async 是异步执行。**

简单的说：

- `async`是异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在`onload`前，但不确定在`DOMContentLoaded`事件的前或后
- `defer`是延迟执行，在浏览器看起来的效果像是将脚本放在了`body`后面一样（虽然按规范应该是在`DOMContentLoaded`事件前，但实际上不同浏览器的优化效果不一样，也有可能在它后面）

**遇到 img 图片类资源**

遇到图片等资源时，直接就是异步下载，不会阻塞解析，下载完毕后直接用图片替换原有 src 的地方

### loaded 和 domcontentloaded

简单的对比：

- DOMContentLoaded 事件触发时，仅当 DOM 加载完成，不包括样式表，图片(譬如如果有 async 加载的脚本就不一定完成)
- load 事件触发时，页面上所有的 DOM，样式表，脚本，图片都已经加载完成了

## JS 引擎解析过程

展开是执行上下文，作用域链，事件循环等。

### 执行上下文

执行上下文可以简单理解为一个对象:

每一个执行上下文，都有三个重要属性:

- 变量对象(Variable object，VO)
- 作用域链(词法作用域)
- this 指向

它的类型:

- 全局执行上下文
- 函数执行上下文
- eval 执行上下文

代码执行过程:

- 浏览器首次载入脚本，创建 全局上下文 (global EC)
- 全局执行上下文 (caller) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (callee) 被 push 到执行栈顶层
- 函数执行上下文被激活，成为 active EC, 开始执行函数中的代码，caller 被挂起
- 函数执行完后，callee 被 pop 移除出执行栈，控制权交还全局上下文 (caller)，继续执行

**VO 与 AO**

VO 是执行上下文的属性（抽象概念），但是只有全局上下文的变量对象允许通过 VO 的属性名称来间接访问（因为在全局上下文里，全局对象自身就是变量对象）

AO（activation object)，当函数被调用者激活，AO 就被创建了 （变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。）

可以理解为：

- 在函数上下文中：VO === AO

- 在全局上下文中：VO === this === global

总的来说，VO 中会存放一些变量信息（如声明的变量，函数，arguments 参数等等）

### 作用域链

我们知道，我们可以在执行上下文中访问到**父级甚至全局的变量**，这便是作用域链的功劳。作用域链可以理解为一组对象列表，包含 父级和自身的变量对象，因此我们便能通过作用域链访问到父级里声明的变量或者函数，原理和原型链很相似。

由两部分组成:

- [[scope]]属性: 指向父级变量对象和作用域链，也就是包含了父级的[[scope]]和 AO
- AO: 自身活动对象（当函数被调用者激活，AO 就被创建了）

如此 `[[scope]]`包含`[[scope]]`，便自上而下形成一条链式作用域。

参考链接

- [冴羽 - JavaScript 深入之作用域链](https://juejin.cn/post/6844903473683628046)
- [冴羽 - JavaScript 深入之执行上下文](https://juejin.cn/post/6844903474027560968)

### 事件循环机制

JS 中存在一个叫做执行栈的东西。JS 的所有同步代码都在这里执行，当执行一个函数调用时，会创建一个新的执行环境并压到栈中开始执行函数中的代码，当函数中的代码执行完毕后将执行环境从栈中弹出，当栈空了，也就代表执行完毕。

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）

```
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。
```

下图就是主线程和任务队列的示意图。

![](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100801.jpg)

只要主线程空了，就会去读取"任务队列"，这就是 JavaScript 的运行机制。这个过程会不断重复。

![](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部 API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。

当一个异步任务执行完毕后会将任务添加到任务队列中。例如：

```js
setTimeout((_) => {}, 1000);
```

代码中 setTimeout 会在一秒后将回调函数添加到任务队列中。事实上异步队列也分两种类型：微任务、宏任务。

微任务和宏任务的区别是，当执行栈空了，会检查微任务队列中是否有任务，将微任务队列中的任务依次拿出来执行一遍。当微任务队列空了，从宏任务队列中拿出来一个任务去执行，执行完毕后检查微任务队列，微任务队列空了之后再从宏任务队列中拿出来一个任务执行。

属于微任务（microtask）的事件有以下几种：

- Promise.then
- await 之后的所有代码（等同于在 Promise.then 中的回调）
- MutationObserver (监视对 DOM 树所做更改)
- process.nextTick（Node 环境）
- setImmediate （Node 环境）

属于宏任务（macrotask）的事件有以下几种：

- script 代码块
- setTimeout
- setInterval
- MessageChannel
- requestAnimationFrame
- I/O
- UI 交互事件

浏览器架构

- 用户界面
- 主进程
- 内核
  - 渲染引擎
  - JS 引擎
    - 执行栈
  - 事件触发线程
    - 消息队列
      - 微任务
      - 宏任务
  - 网络异步线程
  - 定时器线程

参考链接

- [阮一峰 - JavaScript 运行机制详解：再谈 Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)
