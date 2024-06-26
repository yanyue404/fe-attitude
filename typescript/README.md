# TypeScript

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

## 参考资料

- [官网](http://www.typescriptlang.org/) / [中文](https://www.tslang.cn/docs/handbook/basic-types.html) / [Playground](https://www.typescriptlang.org/play/)
- [中文手册](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [冴羽 - TypeScript4 官方文档翻译](https://ts.yayujs.com/)
- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial) https://ts.xcatliu.com/
- [精读《Typescript2.0 - 2.9》](https://juejin.im/post/5b0b93386fb9a00a202ca9f1)
- [TYPESCRIPT 简明指南](https://www.todever.com/2017/09/20/typescript简明指南/)
- [TypeScript 中高级应用与最佳实践](http://www.alloyteam.com/2019/07/13796/)
- [TypeScript 教程](https://www.runoob.com/typescript/ts-tutorial.html)
- [后盾人 - 系统课程 typescript ](https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/typescript/1%20%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE.html)
- [Daily-Interview-Question - TS 基础](https://github.com/Advanced-Frontend/Daily-Interview-Question/labels/TS%E5%9F%BA%E7%A1%80)

**文章**

- [2022 年了，我才开始学 typescript ，晚吗？（7.5k 字总结）](https://juejin.cn/post/7124117404187099172?searchId=202404261335264F8E96C7992736770AFD)
- [https://juejin.cn/post/7344282440725577765](https://juejin.cn/post/7344282440725577765)
- [看完 zustand 源码后，我的 TypeScript 水平突飞猛进](https://juejin.cn/post/7339364757386264612?searchId=202404261335264F8E96C7992736770AFD)
- [TypeScript 入门教程 (免费)](https://juejin.cn/book/7288482920602271802)
- [TypeScript 中提升幸福感的 10 个高级技巧 ](https://github.com/biaochenxuying/blog/issues/80)
