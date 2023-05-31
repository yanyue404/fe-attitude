## webpack 常见 loader 和 plugin 有哪些？二者的区别是什么？

### 常见 loader

在 webpack 文档里写了：

[Loaders | webpack](https://webpack.js.org/loaders/)

你可以记住：

- `babel-loader` 把 JS/TS（ES6） 变成 JS（ES5）
- `ts-loader` 把 TS 变成 JS，**并提示类型错误**
- `markdown-loader` 把 markdown 变成 html
- `html-loader` 把 html 变成 JS 字符串
- `sass-loader` 把 SASS/SCSS 变成 CSS
- `css-loader` 把 CSS 变成 JS 字符串
- `style-loader` 把 JS 字符串变成 style 标签
- `postcss-loader` 把 CSS 变成更优化的 CSS
- `vue-loader` 把单文件组件（SFC）变成 JS 模块
- `file-loader` 把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- `url-loader` 和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- `eslint-loader` 通过 ESLint 检查 JavaScript 代码规范，**并提示类型错误**
- `thread-loader` 用于多进程打包
- `source-map-loader` 加载额外的 Source Map 文件，以方便代码调试

### 常见 plugin

也在 webpack 文档里写了：

[Plugins | webpack](https://webpack.js.org/plugins/)

你可以记住这些：

- `UglifyJsPlugin` 压缩和混淆代码
- `html-webpack-plugin` 用于创建 HTML 页面并自动引入 JS 和 CSS
- `clean-webpack-plugin` 用于清理之前打包的残余文件
- `mini-css-extract-plugin` 用于将 JS 中的 CSS 抽离成单独的 CSS 文件
- `HotModuleReplacementPlugin` 热跟新
- `SplitChunksPlugin` 用于代码分包（Code Split）
- `DllPlugin` + `DllReferencePlugin` 用于避免大依赖被频繁重新打包，大幅降低打包时间
  - [webpack 使用-详解 DllPlugin](https://segmentfault.com/a/1190000016567986)
- `CommonsChunkPlugin` 提高打包效率，将第三方库和业务代码分开打包
- `DefinePlugin` 用于在 webpack config 里添加全局变量
- `copy-webpack-plugin` 用于拷贝静态文件到 dist
- `webpack-bundle-analyzer` 代码分析；

### 二者的区别

- loader 是文件加载器，让 webpack 拥有加载和解析非 JavaScript 文件的能力
  - 功能：能够对文件进行编译、优化、混淆（压缩）等，比如 babel-loader / vue-loader
  - 运行时机：在创建最终产物之前运行
- plugin 是 webpack 插件（这句废话也很重要）
  - 功能：能实现更多功能，比如定义全局变量、Code Split、加速编译等 （基于事件机制工作，会监听 webpack 打包过程中的某些事件，执行改变输出结果的任务）
  - 运行时机：在整个打包过程（以及前后）都能运行

## webpack 怎么写一个 plugin 和 loader

[实现一个 webpack loader 和 webpack plugin](https://github.com/woai3c/Front-end-articles/issues/6)

## babel 编译原理

> 查看 AST https://astexplorer.net/

- babylon 将 ES6/ES7 代码解析成 AST
- babel-traverse 对 AST 进行遍历转译，得到新的 AST
- 新 AST 通过 babel-generator 转换成 ES5

## webpack 如何解决开发时的跨域问题？

在开发时，我们的页面在 `localhost:8080`，JS 直接访问后端接口（如 `https://xiedaimala.com` 或 `http://localhost:3000`）会报跨域错误。

为了解决这个问题，可以在 webpack.config.js 中添加如下配置：

```js
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xiedaimala.com',
        changeOrigin: true
      }
    }
  }
}
```

此时，在 JS 中请求 `/api/users` 就会自动被代理到 `http://xiedaimala.com/api/users` 。

如果希望请求中的 Origin 从 8080 修改为 xiedaimala.com，可以添加 `changeOrigin: true` 。

如果要访问的是 HTTPS API，那么就需要配置 HTTPS 证书，否则会报错。

不过，如果在 target 下面添加 `secure: false` ，就可以不配置证书且忽略 HTTPS 报错。

总之，记住常用选项就行了。

## webpack 如何实现 tree-shaking？

[Tree Shaking | webpack](https://webpack.js.org/guides/tree-shaking/#conclusion)

[Tree Shaking | webpack 中文文档](https://webpack.docschina.org/guides/tree-shaking/#conclusion)

### 是什么

tree-shaking 就是让没有用到的 JS 代码不打包，以减小包的体积。

### 怎么做

1.  怎么删

    1.  使用 ES Modules 语法（即 ES6 的 import 和 export 关键字）
    2.  CommonJS 语法无法 tree-shaking（即 require 和 exports 语法）
        - 需要给 bebel-loader 添加 `modules: false` 选项（避免 babel 将 js 自动编译为 CommonJS ）
    3.  引入的时候只引用需要的模块
        - 要写 `import {cloneDeep} from 'lodash-es'` 因为方便 tree-shaking
        - 不要写 `import _ from 'lodash'` 因为会导致无法 tree-shaking 无用模块

2.  怎么不删：在 package.json 中配置 `sideEffects`，防止某些文件被删掉
    1.  比如我 import 了 x.js，而 x.js 只是添加了 `window.x` 属性，那么 x.js 就要放到 sideEffects 里
    2.  比如所有被 import 的 CSS 都要放在 sideEffects 里
3.  怎么开启：在 webpack config 中将 mode 设置为 production（开发环境没必要 tree-shaking）
    - `mode: production` 给 webpack 加了非常多[优化](https://github.com/webpack/webpack/blob/f43047c4c2aa4b0a315328e4c34a319dc2662254/lib/config/defaults.js#L1125)。

原理： tree-shaking 通过静态分析，对代码进行扫描分析，经过词法分析、语法分析、AST 树等分析手段，识别未被引用的代码，标记为冗余代码，真正剔除操作一般是 uglifyjs 模块。

## webpack 热更新原理

webpack 在热更新模式下，启动服务后，服务端会与客户端建立一个长连接（websocket）。文件修改后，服务端会通过长链接向客户端推送一条消息，客户端收到后，会重新请求一个 js 文件，返回的 js 文件会调用 webpackHotUpdatehmr 方法，用于替换掉 **webpack_modules** 中的部分代码。

1. webpack-dev-server 启动本地服务，与 Client 建立长连接
2. Webpack 监听文件修改，修改后通过长连接通知客户端；
3. Client 重新请求文件，替换 **webpack_modules** 中对应部分

首先，介绍 webpack-dev-server:\
webpack-dev-server 主要包含了三个部分：\
1.webpack: 负责编译代码\
2.webpack-dev-middleware: 主要负责构建内存文件系统，把 webpack 的 OutputFileSystem 替换成 InMemoryFileSystem。同时作为 Express 的中间件拦截请求，从内存文件系统中把结果拿出来。\
3.express：负责搭建请求路由服务。

其次，介绍工作流程:\
1.启动 dev-server，webpack 开始构建，在编译期间会向 entry 文件注入热更新代码；\
2.Client 首次打开后，Server 和 Client 基于 Socket 建立通讯渠道；\
3.修改文件，Server 端监听文件发送变动，webpack 开始编译，直到编译完成会触发"Done"事件；\
4.Server 通过 socket 发送消息告知 Client；\
5.Client 根据 Server 的消息（hash 值和 state 状态），通过 ajax 请求获取 Server 的 manifest 描述文件；\
6.Client 对比当前 modules tree ，再次发请求到 Server 端获取新的 JS 模块；\
7.Client 获取到新的 JS 模块后，会更新 modules tree 并替换掉现有的模块；\
8.最后调用 module.hot.accept() 完成热更新；

## 如何利用 webpack 来优化前端性能

webpack 做性能优化主要是考虑打包体积和打包速度。

打包体积分析用 `webpack-bundle-analyzer` 插件，速度分析用：`speed-measure-webpack-plugin` 插件。

- [从前端工程的角度进行性能优化](https://github.com/yanyue404/blog/issues/241)

## 如何提高 webpack 构建速度？

[构建性能 | webpack 中文文档](https://webpack.docschina.org/guides/build-performance/)

0. speed-measure-webpack-plugin 分析构建时间
1. externals 拆包采用 cdn 方式引入 vue, vue-router 及组件库
1. 使用 DllPlugin 将不常变化的 node_modules 代码提前打包，并复用，如 echarts 下选用的模块
1. 使用 thread-loader 进行多线程打包，加速耗时的 loader （例如 babel-loader）
1. 处于开发环境时，在 webpack config 中 使用 cache-loader 加速 Vue/Babel/TypeScript 编译开启缓存
1. import 优化，运用这个插件（babel-plugin-dynamic-import-node）能在代码使用了 import 语法的情况下，大大提高代码的编译速度。
1. 处于生产环境时，关闭不必要的环节，比如可以关闭 source map
1. 网传的 HardSourceWebpackPlugin 已经一年多没更新了，谨慎使用

## webpack 能做哪些性能优化

1. 压缩代码
2. tree-shaking
3. 根据文件内容生成 hash 当作文件名，配合 CDN 做文件缓存
4. 分割代码，按需加载
5. 将第三方插件或公共代码单独提取出来打包

[三十分钟掌握 Webpack 性能优化](https://juejin.cn/post/6844903651291447309)

### webpack 模块加载原理

[深入了解 webpack 模块加载原理](https://juejin.cn/post/6872354325553741838)

### webpack 的构建流程是什么

[webpack 构建流程分析](https://juejin.cn/post/6844904000169607175)

### webpack 的分包策略

[webpack 的分包策略](https://panjiachen.github.io/awesome-bookmarks/blog/webpack/webpack4-b.html)

## webpack 与 vite 的区别是什么？

1.  开发环境区别

    1.  vite 自己实现 server，不对代码打包，充分利用浏览器对 `<script type=module>` 的支持

        1.  假设 main.js 引入了 vue

        2.  该 server 会把 `import { createApp } from 'vue'` 改为 `import { createApp } from "/node_modules/.vite/vue.js"` 这样浏览器就知道去哪里找 vue.js 了

    2.  webpack-dev-server 常使用 babel-loader 基于内存打包，比 vite 慢很多很多很多
        1.  该 server 会把 vue.js 的代码（递归地）打包进 main.js

2.  生产环境区别

    1.  vite 使用 rollup \+ esbuild 来打包 JS 代码

    2.  webpack 使用 babel 来打包 JS 代码，比 esbuild 慢很多很多很多
        1.  webpack 能使用 esbuild 吗？可以，你要自己配置（很麻烦）。

3.  文件处理时机

    1.  vite 只会在你请求某个文件的时候处理该文件

    2.  webpack 会提前打包好 main.js，等你请求的时候直接输出打包好的 JS 给你

目前已知 vite 的缺点有：

1.  热更新常常失败，原因不清楚（F5, ctrl + R）

2.  有些功能 rollup 不支持，需要自己写 rollup 插件

3.  不支持非现代浏览器（浏览器需要支持`<script type=module>` ）

## webpack 和 rollup 的区别

rollup 从设计之初就是面向 ES module 的，它诞生时 AMD、CMD、UMD 的格式之争还很火热，作者希望充分利用 ES module 机制，构建出结构扁平，性能出众的类库.

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'umd',
      name: 'test'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: 'node_modules/**'
      })
    ]
  }
]
```

webpack 致力于复杂 SPA 的模块化构建，优势在于：

1. 通过 loader 处理各种各样的资源依赖
2. HMR 模块热替换
3. 代码按需加载
4. 提取公共模块

rollup 致力于打造性能出众的类库，有如下优势：

1. 编译出来的代码`可读性好`
2. rollup 打包后生成的 bundle 内容十分`干净`，没有什么多余的代码。相比 webpack(webpack 打包后会生成**webpack_require**等 runtime 代码)，rollup 拥有无可比拟的性能优势，这是由依赖处理方式决定的，`编译时依赖处理（rollup）自然比运行时依赖处理（webpack）性能更好`
3. 对于 ES 模块依赖库，rollup 会静态分析代码中的 import，并将排除任何未实际使用的代码
4. 支持程序流分析，能更加正确的判断项目本身的代码是否有副作用(配合 tree-shaking)
5. 支持导出`es`模块文件（webpack 不支持导出 es 模块）

参考资料：

- [【第九期】Rollup：下一代 ES 模块打包工具](https://zhuanlan.zhihu.com/p/75717476)
- http://www.caoyuanpeng.com/Webpack/rollup跟webpack打包的区别.html

## webpack 怎么配置多页应用？

这是对应的 webpack config：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'admin.html',
      chunks: ['admin']
    })
  ]
}
```

但是，这样配置会有一个「重复打包」的问题：假设 app.js 和 admin.js 都引入了 vue.js，那么 vue.js 的代码既会打包进 app.js，也会打包进 admin.js。我们需要使用 `optimization.splitChunks` 将共同依赖单独打包成 common.js（HtmlWebpackPlugin 会自动引入 common.js）。

### webpack 如何支持无限多页面呢？

写点 Node.js 代码不就实现了么？

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const path = require('path')

const filenames = fs
  .readdirSync('./src/pages')
  .filter(file => file.endsWith('.js'))
  .map(file => path.basename(file, '.js'))

const entries = filenames.reduce((result, name) => ({ ...result, [name]: `./src/pages/${name}.js` }), {})
const plugins = filenames.map(
  name =>
    new HtmlWebpackPlugin({
      filename: name + '.html',
      chunks: [name]
    })
)

module.exports = {
  entry: {
    ...entries
  },
  plugins: [...plugins]
}
```

## swc、esbuild 是什么？

### swc

实现语言：Rust

功能：编译 JS/TS、打包 JS/TS

优势：比 babel 快很多很多很多（20 倍以上）

能否集成进 webpack：能

使用者：Next.js、Parcel、Deno、Vercel、ByteDance、Tencent、Shopify……

做不到：

1.  对 TS 代码进行类型检查（用 tsc 可以）

2.  打包 CSS、SVG

### esbuild

实现语言：Go

功能：同上

优势：比 babel 快很多很多很多很多很多很多（10~100 倍）

能否集成进 webpack：能

使用者：vite、vuepress、snowpack、umijs、blitz.js 等

做不到：

1.  对 TS 代码进行类型检查

2.  打包 CSS、SVG

## 谈谈对于工程化的理解

前端工程化，其实是软件工程在前端方面的应用。什么是软件工程？百度百科的定义：

软件工程是一门研究用工程化方法构建和维护有效的、使用的和高质量的软件的学科。

换句话说，工程化的目的就是为了提升团队的开发效率。例如大家所熟悉的构建打包、性能优化、自动化部署等知识，都属于工程化的内容。

### 重要的几个概念

1、模块化：JS 的模块化、css 的模块化、资源的模块化（模块化是在文件层面上，对代码或资源的拆分）

2、组件化：组件化是在设计层面上，对 UI（用户界面）的拆分，组件化更重要是一种分治思想，封装组件需要注意组件之间的依赖关系（继承、扩展、嵌套）

3、规范化：编码规范、前后端接口规范、文档规范、组件规范、git 分支管理、commit 描述规范...

4、自动化：雪碧图、持续集成、自动化构建、自动化部署、自动化测试（任何简单机械的重复劳动都应该让机器去完成）

### 目录

1. 技术选型：如何进行技术选型？
2. 统一规范
3. 模块化、组件化
4. 构建工具
5. 自动化
6. 性能优化
7. 监控
8. 重构
9. 项目拆分
10. 测试
11. 创造性

参考

- [yanyue404 - 对前端工程化的理解](https://github.com/yanyue404/blog/issues/244)
- https://woai3c.gitee.io/introduction-to-front-end-engineering/
