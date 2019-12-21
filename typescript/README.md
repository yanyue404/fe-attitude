# TypeScript

## 资料

- [官网](http://www.typescriptlang.org/) / [中文](https://www.tslang.cn/docs/handbook/basic-types.html)
- [中文手册](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial) https://ts.xcatliu.com/

## 开始

```bash
# 安装
npm install -g typescript

# 编译单个
tsc hello.ts

# 配置好后编译 ctrl+shift+b (选择变动就编译)
```

## 为什么选择 TypeScript

### TypeScript 增加了代码的可读性和可维护性

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

### TypeScript 非常包容

- TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
- 即使不显式的定义类型，也能够自动做出类型推论 ​
- 可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

### TypeScript 拥有活跃的社区

- 大部分第三方库都有提供给 TypeScript 的类型定义文件
- Google 开发的 Angular2 就是使用 TypeScript 编写的
- TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

### TypeScript 的缺点

任何事物都是有两面性的，我认为 TypeScript 的弊端在于：

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等前端工程师可能不是很熟悉的概念
- 短期可能会增加一些开发成本，毕竟要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 可能和一些库结合的不是很完美

## 错误记录

- [ts] 无法重新声明块范围变量“myAdd”

整个项目文件夹下函数命名不能重复;
