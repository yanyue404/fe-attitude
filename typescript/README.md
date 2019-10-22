# TypeScript

## 资料

- [官网](http://www.typescriptlang.org/) / [中文](https://www.tslang.cn/docs/handbook/basic-types.html)
- [中文手册](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial) https://ts.xcatliu.com/
- [VSCode 搭建 TypeScript 开发环境](https://www.jianshu.com/p/0569d2604119)

## 开始

```bash
# 安装
npm install -g typescript

# 编译单个
tsc hello.ts

# 配置好后编译 ctrl+shift+b (选择变动就编译)
```

## 本质

使用 `.ts`文件编写强类型的 javascript ，赋予 Js 强类型语言特性，书写 ts 然后进行编译

## 错误记录

- [ts] 无法重新声明块范围变量“myAdd”

整个项目文件夹下函数命名不能重复;
