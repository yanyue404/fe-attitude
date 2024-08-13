```json
{
  "compilerOptions": {
    // 允许 TypeScript 项目加载 JS 脚本。编译时，也会将 JS 文件，一起拷贝到输出目录。
    "allowJs": true,
    // 允许import命令默认加载没有default输出的模块。打开这个设置，就可以写import React from "react";
    "allowSyntheticDefaultImports": true,
    // moduleResolution 确定模块路径的算法，即如何查找模块。
    "moduleResolution": "node",
    // jsx设置如何处理.tsx文件
    "jsx": "preserve", // 保持 jsx 语法不变，输出的文件名为.jsx。
    // resolveJsonModule允许 import 命令导入 JSON 文件。
    "resolveJsonModule": true,
    // 指定编译产物的 JS 版本
    "target": "es5",
    // 如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了
    // 设置编译时是否为每个脚本生成类型声明文件.d.ts。
    "declaration": true,
    "declarationDir": "./types", // 设置生成的.d.ts文件所在的目录。
    // noEmit设 置是否产生编译结果。如果不生成，TypeScript 编译就纯粹作为类型检查了。
    "noEmit": true,
    "baseUrl": "./",
    // 类型别名，paths基于baseUrl进行加载，所以必须同时设置后者。
    "paths": {
      "@/*": ["src/*"]
    }
  },
  // extends 配置，tsconfig.json可以继承另一个tsconfig.json文件的配置
  // extends 指定的tsconfig.json会先加载，然后加载当前的tsconfig.json。如果两者有重名的属性，后者会覆盖前者。
  //   include 属性指定所要编译的文件列表， 如果不指定文件后缀名（"src/**/*"），默认包括.ts、.tsx和.d.ts文件。如果打开了allowJs，那么还包括.js和.jsx。
  "include": [
    "types/**/*.d.ts",
    "store/**/*.d.ts",
    "types/**/*.ts",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "vite.config.ts",
    "type/nocheck.ts"
  ],
  // exclude 属性是一个数组，必须与include属性一起使用，用来从编译列表中去除指定的文件。它也支持使用与include属性相同的通配符
  "exclude": ["node_modules", "dist", "**/*.js"]
}
```
