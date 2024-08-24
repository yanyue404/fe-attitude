# Node

## 以项目为单位

**template-cli**

- commander 注册命令行命令
- shelljs 执行 shell 脚本
- inquirer 命令行询问
- chalk 终端输出彩色字符样式
- ora 加载 loading，开始和结束

**create-vant-cli-app**

- yeoman-generator 终端用户命令行应用程序生成器
- fs-extra fs 文件扩展
- inquirer 命令行询问
- consola 命令行 console
- fast-glob 快速批量导入，读取文件
- chalk 终端输出彩色字符样式

## 实用模块

下面来介绍一些实用的 Node.js 模块

### dclone

[dclone](https://github.com/zhangyuang/dclone)用来下载某个特定的 github 仓库的文件夹，而不是下载整个项目，可以缩短你的下载时间

```bash
$ npm i -g dclone
$ dclone https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-loadable
```

### http-server

使用[http-server](https://www.npmjs.com/package/http-server)我们可以快速的创建一个本地 http server 服务，并且托管我们当前目录作为静态资源文件夹而不用特地去用 Node.js 框架来搭建一个静态资源服务

#### 如何使用 http-server

```bash
$ npm install http-server -g # 安装http-server模块
$ http-server . -p 8080 # 监听8080端口，以当前目录作为静态资源目录
```

### npx

使用 npx 来让我们可以方便的调用项目的依赖模块

```bash
$ npx jest # 直接调用node_modules中的jest而不需要手动编写npm script
$ npx create-react-app app # npx 将create-react-app下载到一个临时目录，使用以后再删除。使得你不需要全局安装
```

### optimist

用于解析命令行参数

```js
var argv = require('optimist').argv

if (argv.rif - 5 * argv.xup > 7.138) {
  console.log('Buy more riffiwobbles')
} else {
  console.log('Sell the xupptumblers')
}
```

### yargs

用于开发命令行工具

![](https://raw.githubusercontent.com/yargs/yargs/master/screen.png)

### cloc

使用 cloc 快速统计某文件夹下代码的数据, 更多参考资料查看[代码统计利器 Cloc](https://www.hi-linux.com/posts/4004.html)

```bash
$ npm i -g cloc
$ cloc --exclude-dir=node_modules . --exclude-ext=json,html # 统计文件类型，排除node_modules,排除json，html文件
```

![cloc](https://img.alicdn.com/tfs/TB1kYu2qND1gK0jSZFsXXbldVXa-1136-950.jpg)

### promisify

[util.promisify](http://nodejs.cn/api/util.html#util_util_promisify_original)是 Node.js 的官方 API，使用该 API 我们可以将 callback 形式的 Node.js API 包装为 Promise 的形式,只要符合最后一个参数是 callback，并且 callback 第一个参数是错误处理的 API 都可以通过 promisify 来包装

```js
const { promisify } = require('util')
const { exec } = require('child_process')
const execWithPromise = promisify(exec)

const installServer = async () => {
  try {
    const { stdout, stderr } = await execWithPromise(`npm i -g http-server`)
    if (stderr) {
      console.error(`Error installing http-server: ${stderr}`)
    }
    console.log(`Output: ${stdout}`)
  } catch (error) {
    console.error(`Failed to install http-server: ${error.message}`)
  }
}

installServer()
```

## 使用 npm link 调试模块

熟练的使用 npm link 可以帮助我们本地调试任何开源项目，当我们的一个项目还没有发布到 npmjs.com 想在本地测试时，或者当我们想修改 React/Vue 的源码想在本地测试效果时，我们都需要使用 npm link 来进行测试。npm link 类似于 Linux 中的软链接，简单理解可以理解为一个快捷方式。使用方式：

```
$ cd vue // 进入本地clone下来的vue文件夹
$ npm link // 如果没有全局安装过vue 此时会创建全局node_modules下的一个软链接vue指向本地clone的vue入口文件
$ npm link vue // 在需要用调试vue模块的应用执行该命令会将当前应用的node_modules/vue指向全局node_modules/vue软链接
```
