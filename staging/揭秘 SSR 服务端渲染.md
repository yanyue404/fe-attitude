## 前言

本人主要从个人角度介绍了对服务端渲染的理解，读完本文后，你将了解到：

- 什么是 SSR、CSR、SSG，各模式的利弊有哪些？
- 实现 Vue SSR，什么是同构？如何对 Vue 项目进行同构？
- 了解 SSG
- SSR 模式编码上的改变

## 认识渲染模式：SSR、CSR、SSG

**早期的服务端渲染**

服务端渲染(Server Side Render ) 简称 SSR，在 WEB 1.0 时代，没有 AJAX，前端层薄弱（网页制作、页面仔）的时候，几乎所有应用都是服务端渲染（此时服务器渲染非现在的服务器渲染）。网站后台开发使用 jsp、php 或者其他模板渲染引擎来构造一个应用，当客户端向服务器发出请求，然后服务端运行时查询数据，模板填充，生成 html 内容并返回给客户端。这个时候，浏览器已经拿到了一个完整的被服务器动态组装出来的 HTML 文本，然后将 HTML 渲染到页面中，过程没有任何 JavaScript 代码的参与。

优点：

1. 有利于 SEO，由于页面在服务器生成，搜索引擎直接抓取到最终页面结果。
2. 有利于首屏渲染，html 所需要的数据都在服务器处理好，直接生成 html，首屏渲染时间变短。
3. 服务器的设备的 cpu、云计算能力等都是商用的，比用户的大部分民用设备处理能力快一些。

缺点：

1. 没有与用户进行交互仅仅供读者浏览的网页
2. 每次更新页面的一小的模块，都需要重新请求一次页面，重新查一次数据库，重新组装一次 HTML
3. 前端 JavaScript 代码和后端（jsp、php、jsp）代码混杂在一起，使得日益复杂的 WEB 应用难以维护

**客户端渲染**

客户端渲染 (Client Side Rendering)简称 CSR。2005 年，WEB 进入了 2.0 时代，单一的文字和图片组成的静态网页已经不能满足用户的需求，用户需要更好的用户体验。

Ajax 技术到来，使得前端掀起了新一轮的技术风潮。刚开始，前端工程师通过 Ajax 获取后端数据，然后操作 DOM 渲染页面。但是纯粹的 Ajax 页带来了一定的弊端，大量的异步请求操作、DOM 操作，使得前端代码变得越来越复杂，维护变得相当费力。

随之 nodejs 的出现，前后端的分层时代到来了，涌现了一批基于 MVC，MVP，MVVM 的前端分层框架，前端开启了一场前后端分离的运动，希望可以脱离后端独立发展。前后端分离，表面上看上去是代码分离，实际上是为了前后端人员分离，也就是前后端分家，前端不再归属于后端团队。

前后端分离之后，网页开始被当成了独立的应用程序（SPA，Single Page Application），前端团队接管了所有页面渲染的事，后端团队只负责提供所有数据查询与处理的 API，大体流程是这样的：首先浏览器请求 URL，前端服务器直接返回一个空的静态 HTML 文件（不需要任何查数据库和模板组装），这个 HTML 文件中加载了很多渲染页面需要的 JavaScript 脚本和 CSS 样式表，浏览器拿到 HTML 文件后开始加载脚本和样式表，并且执行脚本，这个时候脚本请求后端服务提供的 API，获取数据，获取完成后将数据通过 JavaScript 脚本动态的将数据渲染到页面中，完成页面显示。

以 vue 为例，客户端渲染初始化的 html 一般如下

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Vue App</title>
    <link href="/js/app.js" rel="preload" as="script" />
    <link href="/js/chunk-vendors.js" rel="preload" as="script" />
  </head>
  <body>
    <div id="app"></div>
    <script type="text/javascript" src="/js/chunk-vendors.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
  </body>
</html>
```

可以看出当前页面除了 `<div id="root"></div>` 元素，没有其他的元素，然后通过加载 `bundle.js` , `main.chunk.js` 来执行渲染。整个渲染过程包括，生成 DOM 节点，注入样式，交互事件绑定，数据获取等等。

优点:

1. 前后端分离。前端专注于界面开发，后端专注于 api 开发，且前端有更多的选择性，可以使用 vue，react 框架开发，而不需要遵循后端特定的模板。
2. 服务器压力变轻了，渲染工作在客户端进行，服务器直接返回不加工的 html
3. 用户在后续访问操作体验好，（首屏渲染慢）可以将网站做成 SPA，可以增量渲染

缺点:

1. 不利于 SEO，因为搜索引擎不执行 JS 相关操作，无法获取渲染后的最终 html。
2. 首屏渲染时间比较长，白屏或展示 loading 动画,因为需要页面执行 ajax 获取数据来渲染页面，如果接口等待时间长，不利于用户体验

**现在的服务端渲染**

随着单页应用（SPA）的发展，程序员们渐渐发现 SEO（Search Engine Optimazition，即搜索引擎优化）出了问题，而且随着应用的复杂化，JavaScript 脚本也不断的臃肿起来，使得首屏渲染相比于 Web1.0 时候的服务端渲染，也慢了不少。

自己选的路，跪着也要走下去。于是前端团队选择了使用 nodejs 在服务器进行页面的渲染，进而再次出现了服务端渲染。因此**现在所说的服务端渲染基本都是 SPA+SSR 的同构渲染，并不是传统意义上的服务端渲染**。大体流程与客户端渲染有些相似，首先是浏览器请求 URL，前端服务器接收到 URL 请求之后，根据不同的 URL，前端服务器向后端服务器请求数据，请求完成后，前端服务器会组装一个携带了具体数据的 HTML 文本，并且返回给浏览器，浏览器得到 HTML 之后开始渲染页面，同时，浏览器加载并执行 JavaScript 脚本，给页面上的元素绑定事件，让页面变得可交互，当用户与浏览器页面进行交互，如跳转到下一个页面时，浏览器会执行 JavaScript 脚本，向后端服务器请求数据，获取完数据之后再次执行 JavaScript 代码动态渲染页面。

优点：

1. 利于 SEO，搜索引擎排行
2. 白屏时间更短，相对于客户端渲染，服务端渲染在浏览器请求 URL 之后已经得到了一个带有数据的 HTML 文本，浏览器只需要解析 HTML，直接构建 DOM 树就可以

缺点：

1. 代码复杂度增加。为了实现服务端渲染，应用代码中需要兼容服务端和客户端两种运行情况，而一部分依赖的外部扩展库却只能在客户端运行，需要对其进行特殊处理，才能在服务器渲染应用程序中运行。
2. 需要更多的服务器负载均衡。由于服务器增加了渲染 HTML 的需求，使得原本只需要输出静态资源文件的 nodejs 服务，新增了数据获取的 IO 和渲染 HTML 的 CPU 占用，如果流量突然暴增，有可能导致服务器 down 机，因此需要使用响应的缓存策略和准备相应的服务器负载。
3. 涉及构建设置和部署的更多要求。与可以部署在任何静态文件服务器上的完全静态单页面应用程序 (SPA) 不同，服务器渲染应用程序，需要处于 Node.js server 运行环境。

**静态站点渲染**

静态站点生成(Static Site Generation) 简称是 SSG，解析是在构建时执行的，当发出请求时，html 将静态存储，直接发送回客户端，相当于一个静态资源。SSG 这种渲染模式采取了 CSR 和 SSR 的共同优点，它不需要开发者介入服务器操作，开发者只需要准备 cdn 或者其他静态网页托管服务器，prerender 出静态资源这一步将在构建时就已经做了，呈现在用户眼前的虽然不是实时变更的，但是也保留了 CSR 和 SSR 的精髓，一定程度上有了平衡。但是因为 prerender 的缘故，它和 SSR 的大致工作方式会相似一点。

优点：

1. 减轻服务器压力，可以把生成的静态资源（html）放到 CDN 上，合理利用缓存
2. 有利于 SEO，由于 html 已经提前生成好，不需要服务端和客户端去渲染

缺点：

1. 在构建阶段所取数据的任何更改都需要在服务端上重建构建生成页面。
2. 随着业务的复杂，需要生成的页面可能不单单只有 1，2 个，所以这对于构建的要求很高

## 同构

知道了服务器渲染的利弊后，假如我们需要在项目中使用服务端渲染，我们需要做什么呢？那就是同构我们的项目。

### 同构的定义

在服务端渲染中，有两种页面渲染的方式：

- 前端服务器通过请求后端服务器获取数据并组装 HTML 返回给浏览器，浏览器直接解析 HTML 后渲染页面
- 浏览器在交互过程中，请求新的数据并动态更新渲染页面

这两种渲染方式有一个不同点就是，一个是在服务端中组装 html 的，一个是在客户端中组装 html 的，运行环境是不一样的。所谓同构，就是让一份代码，既可以在服务端中执行，也可以在客户端中执行，并且执行的效果都是一样的，都是完成这个 html 的组装，正确的显示页面。也就是说，一份代码，既可以客户端渲染，也可以服务端渲染。

### 同构带来的好处

我们不会平白无故地做出任何决策，大家使用同构肯定是因为同构能够带来一些好处：

- 减少代码开发量, 提高代码复用量。因为一份代码能同时跑在浏览器和服务器，因此不仅代码量减少了，而且很多业务逻辑不需要在浏览器和服务端两边同时维护，因而同时减小了程序出错的可能。
- 可以以较小的成本完成 SSR （Server-Side Render）的功能。

### 同构带来的问题

- 一个可以同构的模块必须同时兼容客户端和 Node.js 环境，因此会带来额外的一些开发成本。特别是习惯客户端开发的人要注意 window，document，DOM 等是客户端才存在的对象。
- 服务端内存溢出的风险，客户端代码运行环境随着浏览器刷新会重新建立，因此不需要太注意内存溢出的问题，而服务端则不同。
- 所有在服务端预取的状态都应该有途径能让客户端获取，以免客户端和服务端渲染结果不同导致页面激活失败。因为无论如何客户端都会渲染一次页面，若服务端用来渲染的数据和客户端不一样，那么渲染出来的 dom 也会不一样，导致闪屏，严重情况页面将不可交互。

### 核心原理

`node server` 接收客户端请求，得到当前的 `req url path`,然后在已有的路由表内查找到对应的组件，拿到需要请求的数据，将数据作为 `props、context` 或者 `store` 形式传入组件，然后基于 `Vue` 内置的服务端渲染 api `renderToString()` 把组件渲染为 html 字符串, 因此 server 输出(response)后浏览器端可以得到静态的 HTML 片段(脱水 dehydrate)，浏览器拿到 html 将利用服务端注入到 `window` 中的数据来进行初始化，开始进行渲染和节点对比(注水 hydrate)，然后执行组件的 `mounted` 完成组件内事件绑定和一些交互，至此，浏览器重用并激活了服务端输出的 html 节点，整个流程结束。

### 同构的条件

为了实现同构，我们需要满足什么条件呢？首先，我们思考一个应用中一个页面的组成，假如我们使用的是 Vue.js ，当我们打开一个页面时，首先是打开这个页面的 URL，这个 URL，可以通过应用的 路由 匹配，找到具体的页面，不同的页面有不同的视图，那么，视图是什么？从应用的角度来看，视图 = 模板 + 数据 ，那么在 Vue.js 中， 模板可以理解成 组件 ，数据可以理解为 数据模型 ，即响应式数据。所以，对于同构应用来说，我们必须实现客户端与服务端的路由、模型组件、数据模型的共享。

![](https://raw.githubusercontent.com/yacan8/blog/master/images/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86/image-20200731175841011.png)

## 实现 Vue SSR

知道了服务端渲染、同构的原理之后，下面从头开始，一步一步完成一次同构，通过实践来了解 SSR。

步骤：

- 实现基础的 VUE 客户端渲染
- 实现基础的 NODEJS 服务端渲染
- 同构渲染 Vue 应用
  - 构建配置
  - 模板组件共享
  - 路由的共享和同步
  - 数据的共享和同步

### 实现基础的 VUE 客户端渲染

App.vue

```html
<template>
  <div id="app">
    <button @click="count++">{{ count }}</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 1
      }
    }
  }
</script>
<style>
  html {
    font-size: 13.3333vw;
  }
  * {
    margin: 0;
    padding: 0;
  }
  button {
    font-size: 0.72rem;
    padding: 0.1rem 0.3rem;
  }
</style>
```

main.js

```js
import Vue from 'vue'
import App from './App'

const app = new Vue({
  render: h => h(App)
})

app.$mount('#app')
```

运行 npm 命令，点击按钮发现可以正常交互，数字加加。

```bash
# 监听 3000 端口
npm run serve
```

### 实现基础的 NODEJS 服务端渲染

- renderToString() 接收一个 Vue 应用实例作为参数，返回一个 Promise，当 Promise resolve 时得到应用渲染的 HTML

```ts
function renderToString(input: App | VNode, context?: SSRContext): Promise<string>
```

```js
const express = require('express')
const Vue = require('vue')
const app = express()
const renderer = require('vue-server-renderer').createRenderer()
// ⻚页⾯面
const page = new Vue({
  data: {
    count: 1
  },
  template: `<button @click="count++">{{count}}</button>`
})
app.get('/', async function(req, res) {
  // renderToString可以将vue实例例转换为html字符串串
  const html = await renderer.renderToString(page)
  res.send(html)
})
app.listen(3001, () => {
  console.log('启动成功， http://127.0.0.1:3001/')
})
```

运行 npm 命令

```bash
# 监听 3001 端口
npm run serve
```

点击页面中的按钮发现完全没有反应。 因为这段 HTML 在客户端是完全静态的，在浏览器中展示的时候并没有被 Vue 接管。那么怎样使得客户端的应用完整可交互呢？

### 同构渲染

为了使客户端的应用可交互，Vue 需要执行一个激活步骤。在激活过程中，Vue 会创建一个与服务端完全相同的应用实例，然后将每个组件与它应该控制的 DOM 节点相匹配，并添加 DOM 事件监听器，将静态的 HTML“激活”(hydrate) 为能够交互的客户端应用。

vue-server-renderer 提供一个名为 createBundleRenderer 的 API，用于处理此问题，通过使用 webpack 的自定义插件，server bundle 将生成为可传递到 bundle renderer 的特殊 JSON 文件。所创建的 bundle renderer，用法和普通 renderer 相同，但是 bundle renderer 提供以下优点：

- 内置的 source map 支持（在 webpack 配置中使用 devtool: 'source-map'）
- 在开发环境甚至部署过程中热重载（通过读取更新后的 bundle，然后重新创建 renderer 实例）
- 关键 CSS(critical CSS) 注入（在使用 \*.vue 文件时）：自动内联在渲染过程中用到的组件所需的 CSS。
- 使用 clientManifest 进行资源注入：自动推断出最佳的预加载(preload)和预取(prefetch)指令，以及初始渲染所需的代码分割 chunk。

两个配置文件会分别生成 vue-ssr-client-manifest.json 和 vue-ssr-server-bundle.json。作为 createBundleRenderer 的参数。

bundle renderer 在调用 renderToString 时，它将自动执行「由 bundle 创建的应用程序实例」所导出的函数（传入上下文作为参数），然后渲染它。

用法示例：

```js
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'))
const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template, //（可选）页面模板
  clientManifest: clientManifest // （可选）客户端构建 manifest
})

// 在服务器处理函数中……
server.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    // 处理异常……
    res.end(html)
  })
})
```

#### 构建配置

模板组件的共享，其实就是使用同一套组件代码，为了实现 Vue 组件可以在服务端中运行，首先我们需要解决代码编译问题。一般情况，vue 项目使用的是 webpack 进行代码构建，同样，服务端代码的构建，也可以使用 webpack，借用官方的一张。

![vue服务端渲染构建](https://raw.githubusercontent.com/yacan8/blog/master/images/%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86/vue%E6%9C%8D%E5%8A%A1%E7%AB%AF%E6%B8%B2%E6%9F%93%E6%9E%84%E5%BB%BA.png)

##### 第一步：构建服务端代码

由前面的图可以看到，在服务端代码构建结束后，需要将构建结果运行在 nodejs 服务器上，但是，对于服务端代码的构建，有一下内容需要注意：

- 不需要编译 CSS，样式表只有在浏览器（客户端）运行时需要。
- 构建的目标的运行环境是 commonjs，nodejs 的模块化模式为 commonjs
- 不需要代码切割，nodejs 将所有代码一次性加载到内存中更有利于运行效率

于是，我们得到一个服务端的 webpack 构建配置文件 vue.server.config.js

```js
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = {
  css: {
    // 不提取 CSS
    extract: false
  },
  outputDir: 'dist/server',
  configureWebpack: () => ({
    // 服务器入口文件
    entry: `./src/server-entry.js`,
    devtool: 'source-map',
    // 构建目标为nodejs环境
    target: 'node',
    output: {
      // 构建目标加载模式 commonjs
      libraryTarget: 'commonjs2'
    },
    // 跳过 node_mdoules，运行时会自动加载，不需要编译
    externals: nodeExternals({
      // 允许css文件，方便css module
      allowlist: [/\.css$/]
    }),
    // 关闭代码切割
    optimization: {
      splitChunks: false
    },
    plugins: [new VueSSRServerPlugin()]
  })
}
```

使用 `vue-server-renderer`提供的`server-plugin`，这个插件主要配合下面讲到的`client-plugin`使用，作用主要是用来实现 nodejs 在开发过程中的热加载、source-map、生成 html 文件。

##### 第二步：构建客户端代码

在构建客户端代码时，使用的是客户端的执行入口文件，构建结束后，将构建结果在浏览器运行即可，但是在服务端渲染中，HTML 是由服务端渲染的，也就是说，我们要加载那些 JavaScript 脚本，是服务端决定的，因为 HTML 中的 script 标签是由服务端拼接的，所以在客户端代码构建的时候，我们需要使用插件，生成一个构建结果清单，这个清单是用来告诉服务端，当前页面需要加载哪些 JS 脚本和 CSS 样式表。

于是我们得到了客户端的构建配置，vue.client.config.js

```js
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  outputDir: 'dist/client',
  configureWebpack: () => ({
    entry: `./src/client-entry.js`,
    devtool: 'source-map',
    target: 'web',
    plugins: [new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  }
}
```

使用`vue-server-renderer`提供的`client-server`，主要作用是生成构建加过清单`vue-ssr-client-manifest.json`，服务端在渲染页面时，根据这个清单来渲染 HTML 中的 script 标签（JavaScript）和 link 标签（CSS）。

接下来，我们需要将 vue.client.config.js 和 vue.server.config.js 都交给 vue-cli 内置的构建配置文件 vue.config.js，根据环境变量使用不同的配置

// vue.config.js

```js
const isDev = process.env.NODE_ENV === 'development'
const TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
const serverConfig = require('./vue.server.config')
const clientConfig = require('./vue.client.config')

if (isDev) {
  module.exports = {
    devServer: {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 3000,
      https: false,
      hotOnly: false
    }
  }
} else {
  if (TARGET_NODE) {
    module.exports = serverConfig
  } else {
    module.exports = clientConfig
  }
}
```

使用`cross-env`区分环境

```json
{
  "scripts": {
    "build:client": "vue-cli-service build",
    "build:server": "cross-env WEBPACK_TARGET=node vue-cli-service build",
    "start": "node src/server.js",
    "ssr": "npm run build:client && npm run build:server && npm run start"
  }
}
```

### 模板组件共享

##### 第一步：创建 VUE 实例

为了实现模板组件共享，我们需要将获取 Vue 渲染实例写成通用代码，如下 createApp：

```js
import Vue from 'vue'
import App from './App'

export default function createApp(context) {
  const app = new Vue({
    render: h => h(App)
  })
  return {
    app
  }
}
```

##### 第二步：客户端实例化 VUE

新建客户端项目的入口文件，client-entry.js

```js
import Vue from 'vue'
import createApp from './createApp'

const { app } = createApp()

app.$mount('#app')
```

client-entry.js 是浏览器渲染的入口文件，在浏览器加载了客户端编译后的代码后，组件会被渲染到 id 为 app 的元素节点上。

##### 第三步：服务端实例化 VUE

新建服务端代码的入口文件，server-entry.js

```js
import createApp from './createApp'

export default context => {
  const { app } = createApp(context)
  return app
}
```

server-entry.js 是提供给服务器渲染 vue 组件的入口文件，在浏览器通过 URL 访问到服务器后，服务器需要使用 server-entry.js 提供的函数，将组件渲染成 html。

##### 第四步：HTTP 服务

所有东西的准备好之后，我们需要修改 nodejs 的 HTTP 服务器的启动文件。首先，加载服务端代码 server-entry.js 的 webpack 构建结果

```js
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const serverBundle = path.resolve(process.cwd(), 'dist/server', 'vue-ssr-server-bundle.json')
```

加载客户端代码 client-entry.js 的 webpack 构建结果

```js
const clientManifestPath = path.resolve(process.cwd(), 'dist/client', 'vue-ssr-client-manifest.json')
const clientManifest = JSON.parse(fs.readFileSync(clientManifestPath, 'utf-8'))
```

使用 [vue-server-renderer](https://www.npmjs.com/package/vue-server-renderer) 的`createBundleRenderer`创建一个 html 渲染器：

```js
const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
const renderer = createBundleRenderer(serverBundle, {
  template, // 使用 HTML 模板
  clientManifest // 将客户端的构建结果清单传入
})
```

创建 HTML 模板，index.html

```html
<html>
  <head>
    <title>SSR</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

在 HTML 模板中，通过传入的客户端渲染结果`clientManifest`，将自动注入所有 link 样式表标签，而占位符将会被替换成模板组件被渲染后的具体的 HTML 片段和 script 脚本标签。

HTML 准备完成后，我们在 server 中挂起所有路由请求

```js
const express = require('express')
const app = express()

app.get('*', function(req, res) {
  renderer.renderToString({}, (err, html) => {
    if (err) {
      res.send('500 server error')
      return
    }
    res.send(html)
  })
})

app.listen(3003, () => {
  console.log('listen: http://127.0.0.1:3003/')
})
```

接下来，我们构建客户端、服务端项目，然后执行 `npm run ssr`，打开页面源代码，

看起来是符合预期的，但是发现控制台有报错，加载不到客户端构建 css 和 js，报 404，原因很明确，我们没有把客户端的构建结果文件挂载到服务器的静态资源目录，在挂载路由前加入下面代码：

```js
app.use(express.static(path.resolve(process.cwd(), 'dist/client')))
```

看起来大功告成，点击数字 count 进行了加加，细心的同学会发现根节点有一个`data-server-rendered`属性，这个属性有什么作用呢？

由于服务器已经渲染好了 HTML，我们显然无需将其丢弃再重新创建所有的 DOM 元素。相反，我们需要"激活"这些静态的 HTML，然后使他们成为动态的（能够响应后续的数据变化）。

如果检查服务器渲染的输出结果，应用程序的根元素上添加了一个特殊的属性：

```js
<div id="app" data-server-rendered="true">
```

`data-server-rendered`是特殊属性，让客户端 Vue 知道这部分 HTML 是由 Vue 在服务端渲染的，并且应该以激活模式进行挂载。

### 路由的共享和同步

完成了模板组件的共享之后，下面完成路由的共享，我们前面服务器使用的路由是`*`，接受任意 URL，这允许所有 URL 请求交给 Vue 路由处理，进而完成客户端路由与服务端路由的复用。

##### 第一步：创建 ROUTER 实例

为了实现复用，与 createApp 一样，我们创建一个 createRouter.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'
Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]
export default function createRouter() {
  return new Router({
    mode: 'history',
    routes
  })
}
```

在 createApp.js 中创建 router

```js
import Vue from 'vue'
import App from './App'
import createRouter from './createRouter'

export default function createApp(context) {
  const router = createRouter() // 创建 router 实例
  const app = new Vue({
    router, // 注入 router 到根 Vue 实例
    render: h => h(App)
  })
  return { router, app }
}
```

##### 第二步：路由匹配

router 准备好了之后，修改 server-entry.js，将请求的 URL 传递给 router，使得在创建 app 的时候可以根据 URL 匹配到对应的路由，进而可知道需要渲染哪些组件

```js
import createApp from './createApp'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // onReady 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          url: context.url,
          code: 404
        })
      }
      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
```

修改 server.js 的路由，把 url 传递给 renderer

```js
app.get('*', function(req, res) {
  const context = {
    url: req.url
  }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.log(err)
      res.send('500 server error')
      return
    }
    res.send(html)
  })
})
app.listen(3004, () => {
  console.log('listen: http://127.0.0.1:3004/')
})
```

为了测试，我们将 App.vue 修改为 router-view

```html
<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view />
  </div>
</template>
```

Home.vue

```html
<template>
  <div>Home Page</div>
</template>
```

About.vue

```html
<template>
  <div>About Page</div>
</template>
```

编译，运行，查看源代码

点击路由并没有刷新页面，而是客户端路由跳转的，一切符合预期。

### 数据模型的共享与状态同步

前面我们简单的实现了服务端渲染，但是实际情况下，我们在访问页面的时候，还需要获取需要渲染的数据，并且渲染成 HTML，也就是说，在渲染 HTML 之前，我们需要将所有数据都准备好，然后传递给 renderer。

如果 SSR 需要初始化一些异步数据，那么流程就会变得复杂一些。

我们先提出几个问题：

服务端拿异步数据的步骤在哪做？
如何确定哪些组件需要获取异步数据？
获取到异步数据之后要如何塞回到组件内？
带着问题我们向下走，希望看完这篇文章的时候上面的问题你都找到了答案。

服务器端渲染和浏览器端渲染组件经过的生命周期是有区别的，在服务器端，只会经历 beforeCreate 和 created 两个生命周期。因为 SSR 服务器直接吐出 html 字符串就好了，不会渲染 DOM 结构，所以不存在 beforeMount 和 mounted 的，也不会对其进行更新，所以也就不存在 beforeUpdate 和 updated 等。

我们先来想一下，在纯浏览器渲染的 Vue 项目中，我们是怎么获取异步数据并渲染到组件中的？一般是在 created 或者 mounted 生命周期里发起异步请求，然后在成功回调里执行 this.data = xxx，Vue 监听到数据发生改变，走后面的 Dom Diff，打 patch，做 DOM 更新。

那么服务端渲染可不可以也这么做呢？答案是不行的。

1. 在 mounted 里肯定不行，因为 SSR 都没有 mounted 生命周期，所以在这里肯定不行。
2. 在 beforeCreate 里发起异步请求是否可以呢，也是不行的。因为请求是异步的，可能还没有等接口返回，服务端就已经把 html 字符串拼接出来了。

所以，参考一下官方文档，我们可以得到以下思路：

1. 在渲染前，要预先获取所有需要的异步数据，然后存到 Vuex 的 store 中。
2. 在后端渲染时，通过 Vuex 将获取到的数据注入到相应组件中。
3. 把 store 中的数据设置到 window.**INITIAL_STATE**属性中。
4. 在浏览器环境中，通过 Vuex 将 window.**INITIAL_STATE**里面的数据注入到相应组件中。

```js
if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
  console.log('window.__INITIAL_STATE__', window.__INITIAL_STATE__)
  store.replaceState(window.__INITIAL_STATE__)
}
```

正常情况下，通过这几个步骤，服务端吐出来的 html 字符串相应组件的数据都是最新的，所以第 4 步并不会引起 DOM 更新，但如果
出了某些问题，吐出来的 html 字符串没有响应数据，Vue 也可以在浏览器端通过`Vuex` 注入数据，进行 DOM 更新。

下面，我们将状态数据交给 Vuex 进行管理，当然，状态也可以保存在组件内部，只不过需要组件实例化的时候自己去同步数据。

##### 第一步：创建 STORE 实例

首先第一步，与 createApp 类似，创建一个 createStore.js，用来实例化 store，同时提供给客户端和服务端使用

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { fetchAll, fetchItem } from './api'

Vue.use(Vuex)

export default function createStore() {
  return new Vuex.Store({
    state: {
      todoList: null,
      todoItem: null
    },
    actions: {
      fetchAll({ commit }) {
        return fetchAll().then(todos => {
          commit('setTodoList', todos)
        })
      },
      fetchItem({ commit }, id) {
        return fetchItem(id).then(item => {
          commit('setItem', item)
        })
      }
    },
    mutations: {
      setTodoList(state, items) {
        state.todoList = items
      },
      setItem(state, item) {
        state.todoItem = item
      }
    }
  })
}
```

actions 封装了请求数据的函数，mutations 用来设置状态。

将 createStore 加入到 createApp 中，并将 store 注入到 vue 实例中，让所有 Vue 组件可以获取到 store 实例

```js
export default function createApp(context) {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store, // 注入 store 到根 Vue 实例
    render: h => h(App)
  })
  return { router, store, app }
}
```

为了方便测试，我们 mock 远程服务函数 fetchAll、fetchItem，用于异步查询

```js
const items = [
  { id: 1, name: '吃饭' },
  { id: 2, name: '睡觉' },
  { id: 3, name: '打豆豆' }
]

export function fetchAll(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(items)
    }, 1500)
  })
}

export function fetchItem(id) {
  const item = items.find(i => i.id == id)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(item)
    }, 1500)
  })
}
```

##### 第二步：STORE 连接组件

一般情况下，我们需要通过访问路由，来决定获取哪部分数据，这也决定了哪些组件需要渲染。事实上，给定路由所需的数据，也是在该路由上渲染组件时所需的数据。所以，我们需要在路由的组件中放置数据预取逻辑函数。

在 Home 组件中自定义一个静态函数`asyncData`，需要注意的是，由于此函数会在组件实例化之前调用，所以它无法访问 `this`。需要将 store 和路由信息作为参数传递进去

```html
<template>
  <div>
    <div v-if="todoList" v-for="item in todoList" :key="item.id">
      <li>{{ item.name }}</li>
    </div>
    <div v-if="todoItem">
      <div>id: {{ todoItem.id }}</div>
      <div>name: {{ todoItem.name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    asyncData({ store, route }) {
      // 触发 action 后，会返回 Promise
      console.log('route.query.id', route.query.id)
      if (route.query.id) {
        return store.dispatch('fetchItem', route.query.id)
      } else {
        return store.dispatch('fetchAll')
      }
    },
    computed: {
      // 从 store 的 state 对象中的获取。
      todoList() {
        return this.$store.state.todoList
      },
      todoItem() {
        console.log('数据在此', this.$store.state.todoItem)
        return this.$store.state.todoItem
      }
    }
  }
</script>
```

##### 第三步：服务端获取数据

在服务器的入口文件`server-entry.js`中，我们通过 URL 路由匹配 `router.getMatchedComponents()`得到了需要渲染的组件，这个时候我们可以调用组件内部的`asyncData`方法，将所需要的所有数据都获取完后，传递给渲染器 renderer 上下文。

修改 createApp，在路由组件匹配到了之后，调用 asyncData 方法，获取数据后传递给 renderer

```js
import createApp from './createApp'

export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前就已经准备就绪。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 设置服务器端 router 的位置
    router.push(context.url)
    // onReady 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      console.log('matchedComponents', matchedComponents)
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({
          url: context.url,
          code: 404
        })
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            console.log('Component.asyncData', Component.asyncData)
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      )
        .then(() => {
          console.log(' store.state', store.state)
          // 当使用 template 时，context.state 将作为 window.__INITIAL_STATE__ 自动嵌入到最终的 HTML 中，方便后面客户端激活数据
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
```

将 state 存入 context 后，在服务端渲染 HTML 时候，也就是渲染 template 的时候，context.state 会作为 window.\***\*INITIAL_STATE\*\***自动插入到模板 html 中，方便客户端激活数据。

##### 第四步：客户端激活状态数据

服务端预请求数据之后，通过将数据注入到组件中，渲染组件并转化成 HTML，然后吐给客户端，那么客户端为了激活后端返回的 HTML 被解析后的 DOM 节点，需要将后端渲染组件时用的 store 的 state 也同步到浏览器的 store 中，保证在页面渲染的时候保持与服务器渲染时的数据是一致的，才能完成 DOM 的激活，也就是我们前面说到的`data-server-rendered`标记。

在服务端的渲染中，state 已经被序列化到了`window.__INITIAL_STATE__`，比如我们访问 http://localhost:3005， 查看页面源代码

```html
<html>
  <head>
    <title>SSR</title>
    <link rel="preload" href="/js/chunk-vendors.21481cff.js" as="script" />
    <link rel="preload" href="/js/main.a69a758b.js" as="script" />
  </head>
  <body>
    <div id="app" data-server-rendered="true">
      <a href="/" aria-current="page" class="router-link-exact-active router-link-active">Home</a>
      <a href="/about">About</a>
      <div>
        <div>
          <li>吃饭</li>
        </div>
        <div>
          <li>睡觉</li>
        </div>
        <div>
          <li>打豆豆</li>
        </div>
        <!---->
      </div>
    </div>
    <script>
      window.__INITIAL_STATE__ = {
        todoList: [
          {
            id: 1,
            name: '吃饭'
          },
          {
            id: 2,
            name: '睡觉'
          },
          {
            id: 3,
            name: '打豆豆'
          }
        ],
        todoItem: null
      }
    </script>
    <script src="/js/chunk-vendors.21481cff.js" defer></script>
    <script src="/js/main.a69a758b.js" defer></script>
  </body>
</html>
```

可以看到，状态已经被序列化到`window.__INITIAL_STATE__`中，我们需要做的就是将这个`window.__INITIAL_STATE__`在客户端渲染之前，同步到客户端的 store 中，下面修改 client-entry.js

```js
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  // 激活状态数据
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app', true)
})
```

通过使用 store 的 replaceState 函数，将`window.__INITIAL_STATE__`同步到 store 内部，完成数据模型的状态同步。

## 了解 SSG

如果预先知道某些路由所需的路由和数据，我们可以使用与生产环境 SSR 相同的逻辑将这些路由预先渲染到静态 HTML 中。这也被视为一种静态站点生成（SSG）的形式。

[vue 官方 - 更通用的解决方案](https://cn.vuejs.org/guide/scaling-up/ssr.html#higher-level-solutions)

### 1. nuxt

https://xxx.com/comm-url/N20220009/

app.html

```html
<html>
  <head>
    <title>SSG</title>
    <link rel="preload" href="/js/chunk-vendors.4de074b7.js" as="script" />
    <link rel="preload" href="/js/main.41c7111d.js" as="script" />
  </head>
  <body>
    <div id="app" data-server-rendered="true">
      <div style="border-radius:0">
        <img src="https://xxx.com/tkcms/file/upload/mob/productImg/file_N20220009-gfxyd/banner-1.png" alt="" />
        <video
          playsinline="playsinline"
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          loop="loop"
          src="https://xxx.com/tkcms/file/upload/NRZY/file_spk/gfxydywx.mp4"
          class="video"
          style="display:none"
        ></video>
      </div>
    </div>
    <script>
      window.__NUXT__ = (function(i) {
        return {
          layout: 'default',
          data: [{}],
          error: null,
          state: {
            cmsData: {
              headImages: [
                {
                  src: 'https://xxx.com/tkcms/file/upload/mob/productImg/file_N20220009-gfxyd/banner-1.png',
                  link: 'https://xxx.com/tkcms/file/upload/NRZY/file_spk/gfxydywx.mp4',
                  label: i
                }
              ]
            }
          }
        }
      })('')
    </script>
    <script src="/js/chunk-vendors.4de074b7.js" defer></script>
    <script src="/js/main.41c7111d.js" defer></script>
  </body>
</html>
```

### 2. [vite/ssg-vue](https://github.com/vitejs/vite/tree/main/playground/ssr-vue)

entry-server.js

```js
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'

export async function render(url, manifest) {
  const { app, router } = await createApp()
  // set the router to the desired URL before rendering
  if (router) {
    router.push(url)
    await router.isReady()
  }

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  const html = await renderToString(app, ctx)
  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  // const preloadLinks = '';
  return [html, preloadLinks]
}

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach(id => {
    const files = manifest[id]
    if (files) {
      files.forEach(file => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    // TODO
    return ''
  }
}
```

prerender.js

```js
// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs'
import path from 'node:path'

const toAbsolute = p => path.resolve(__dirname, p)

const manifest = (await import('./dist/static/ssr-manifest.json')).default
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// determine routes to pre-render from src/pages
const routesToPrerender = fs.readdirSync(toAbsolute('src/pages')).map(file => {
  const name = file.replace(/\.vue$/, '').toLowerCase()
  return name === 'home' ? `/` : `/${name}`
})

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template.replace(`<!--preload-links-->`, preloadLinks).replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()
```

## SSR 模式编码上的改变

[vue 官方 - 书写 SSR 友好的代码](https://staging-cn.vuejs.org/guide/scaling-up/ssr.html#writing-ssr-friendly-code)

1. 访问平台特有 API

通用代码不能访问平台特有的 API，如果你的代码直接使用了浏览器特有的全局变量，比如 window 或 document，他们会在 Node.js 运行时报错，反过来也一样。

对于在服务器和客户端之间共享，但使用了不同的平台 API 的任务，建议将平台特定的实现封装在一个通用的 API 中，或者使用能为你做这件事的库。例如你可以使用 node-fetch 在服务端和客户端使用相同的 fetch API。

对于浏览器特有的 API，通常的方法是在仅客户端特有的生命周期钩子中惰性地访问它们，例如 mounted。

请注意，如果一个第三方库编写时没有考虑到通用性，那么要将它集成到一个 SSR 应用中可能会很棘手。你或许可以通过模拟一些全局变量来让它工作，但这只是一种 hack 手段并且可能会影响到其他库的环境检测代码。

```js
/* Nuxt.js 判定代码在服务器端环境运行 */
export function isServer() {
  return process.server
}
// 客户端环境 ：process.browser
```

```js
global.urlParams = isServer() ? {} : getQueryJson()
global.envParams = isServer() ? {} : { browserEnv: getEnv() }

export default {
  computed: {
    applicantName() {
      return isServer() ? '' : this.applicantData.applicantName
    }
  },
  watch: {
    shareConf: {
      immediate: true,
      handler: function({ appShowMenu, wxShare }) {
        if (isServer()) {
          return
        }
        // 一会儿在分享
      }
    }
  }
}
```

2. 同构激活不匹配报错

如果预渲染的 HTML 的 DOM 结构不符合客户端应用的期望，就会出现激活不匹配。

```
[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content. This is likely caused by incorrect HTML markup, for example nesting block-level elements inside <p>, or missing <tbody>. Bailing hydration and performing full client-side render.
```

最常见的激活不匹配是以下几种原因导致的：

1. 组件模板中存在不符合规范的 HTML 结构，渲染后的 HTML 被浏览器原生的 HTML 解析行为纠正导致不匹配。举例来说，一个常见的错误是 `<div>` 不能被放在 `<p>` 中。

```html
<p><div>hi</div></p>
```

如果我们在服务器渲染的 HTML 中出现这样的代码，当遇到 `<div>` 时，浏览器会结束第一个`<p>`，并解析为以下 DOM 结构：

```html
<p></p>
<div>hi</div>
<p></p>
```

2. 渲染所用的数据中包含随机生成的值。由于同一个应用会在服务端和客户端执行两次，每次执行生成的随机数都不能保证相同。避免随机数不匹配有两种选择：

- 利用 v-if + onMounted 让需要用到随机数的模板只在客户端渲染。你所用的上层框架可能也会提供简化这个用例的内置 API，比如 VitePress 的 `<ClientOnly>` 组件。
- 使用一个能够接受随机种子的随机数生成库，并确保服务端和客户端使用同样的随机数种子 (比如把种子包含在序列化的状态中，然后在客户端取回)。

3. 服务端和客户端的时区不一致。有时候我们可能会想要把一个时间转换为用户的当地时间，但在服务端的时区跟用户的时区可能并不一致，我们也并不能可靠的在服务端预先知道用户的时区。这种情况下，当地时间的转换也应该作为纯客户端逻辑去执行。

当 Vue 遇到激活不匹配时，它将尝试**自动恢复并调整预渲染的 DOM 以匹配客户端的状态**。这将导致一些渲染性能的损失，因为需要丢弃不匹配的节点并渲染新的节点，但大多数情况下，应用应该会如预期一样继续工作。尽管如此，最好还是在开发过程中发现并避免激活不匹配。

> hydrate fail 帮助链接：
>
> - [NUXT 定位 Vue SSR DOM 不匹配错误](https://juejin.cn/post/6844904035720364045)

## 参考链接

- [vite - 服务端渲染](https://cn.vitejs.dev/guide/ssr.html)
- [vue - 服务端渲染 (SSR)](https://staging-cn.vuejs.org/guide/scaling-up/ssr.html)
- [彻底理解服务端渲染 - SSR 原理](https://github.com/yacan8/blog/issues/30)
- [带你五步学会 Vue SSR](https://segmentfault.com/a/1190000016637877)
- https://vue3js.cn/interview/vue/ssr.html
- https://juejin.cn/post/6844903616705232909
