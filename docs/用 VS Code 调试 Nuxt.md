## 基本步骤

1. VS Code 安装 Debugger for Chrome 插件
2. 配置 launch.json 与 source-map 映射关系
3. 命令行启动项目
4. 为项目添加断点
5. Start Debuggging（F5 快捷键）

## 用 VS Code 调试 Nuxt

Vue 项目的路径 source-map 需要单独映射一下，才能对应到源码的位置，因为默认的源码映射会在文件后添加 `hash` 值（类似 [resource-path]?[hash]）。

也就是调试配置里多了个 sourceMapPathOverrides：

**.vscode/launch.json**

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:3335/tkproperty/pos/renewal-cloud",
      "sourceMapPathOverrides": {
        "yanyue404://*": "${workspaceFolder}/*"
      }
    }
  ]
}
```

> url 设置为项目对应的 baseUrl，如： http://localhost:7711/tkproperty/nprd/N20210033

**nuxt.config.js**

```js
const build = () => {
    extend(config, { isClient }) {
        if(isClient) {
        // 非生产环境开启 source-map
        if (process.env.PATH_TYPE !== "production") {
           config.devtool  = "eval-source-map"
           Object.assign(config.output, {
             devtoolModuleFilenameTemplate: 'yanyue404://[resource-path]'
          })
        }
      }
    }
};
```

参考链接

- 如何让 Vue、React 代码的调试变得更爽
