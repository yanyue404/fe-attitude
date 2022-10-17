## vue-cli 配置

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。

## 基础设施

- CSS 处理
  - css 预处理 Sass（dart-sass） √
  - reset 样式重置 √
  - base 样式处理 ok
  - 分离 vue 组件内的 css 样式 √
  - variable 公共样式变量定义 √
  - postcss + autoprefixer （非测试环境增加 css 兼容） √
- 移动端适配方案
  - rem 布局 + postcss-pxtorem √
  - pxtorem（适配 vant-ui ）√
- UI 库
  - vant-ui √
  - vant 主题色定制 √
- 网络服务
  - 集成 axios 封装请求（http.js+api.js） √
  - 统一请求拦截器配置 √
  - 统一相应拦截器配置 √
- 组件
  - 通用组件（TODO: 待整理）
  - 业务内容组件（随业务需求自行增加）
- 常用 util 分类添加 √
- 验证器服务
  - 验证器类加入 √
  - 基础，常见校验规则内置（姓名、电话、证件号等） √
- vuex
  - vuex 分模块 √
  - vuex 持久化存储 √

## 构建目标

- 不同环境变量 `.env` 文件添加 √
- 不同环境打包指令 `npm scripts` 区分 √

## 打包优化

- vant 按需加载 √
- lodash 按需加载 √
- 生产环境外部文件引入：vue 全家桶，encrypt √
- css 优先加载，JS 后置（prefetch 的开启关闭） √
- 小图处理（精灵图 webpack-spritesmith） √

## 开发体验

- 调试
  - 非生产环境开启 vconsole √
  - 非生产环境开启 sourcemap（eval-source-map） √
- 常用路径别名添加 √
- 常见移动端兼容性处理
  - 底部安全距离兼容 √
- 常用全局变量暴露
  - urlParams 链接参数暴露 √
- 常用原型方法添加
  - toast、loading 原型方法添加（通用组件 Toast、Loading、Lazyload） √
  - $vue 实例暴露 √
