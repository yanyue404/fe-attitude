## 目录

- 0. 面临痛点
- 1. Prettier 配置代码风格自动格式化
  - （1）VS Code 保存时自动格式化
  - （2）Git 整合提交自动格式化
  - （3）小结
- 2. ESlint 静态代码检查
- 3. Commitlint git 提交规范
- 4. 最佳实践：lint-staged 自动修复格式错误
- 5. 参考链接

## 零、面临痛点

解决目标：团队多人代码开发编程规范问题，指望人来遵守规范比较麻烦 -> 让程序自动处理规范内容

面临的问题：

1、经常看到编程上的不规范比如：有的地方有空格进行分割，有的地方却没有；有的地方是单引号，有的地方却是双引号；有的地方有分号，有的地方没有分号。。。虽然有可能正常运行，但这种是“不及格”的代码。

2、虽然制定了 git 提交规范代码托管-GIT 分支管理模型 ，但是指望所有人严格遵守有时候也会遇到问题，比如着急上线可能代码直接在 dev 上修改，完全忽略了之前的分支管理规范。

因此核心转变为靠程序来自动处理部分规范化的问题，一方面保证开发效率，一方面保证代码规范，促进团队形成统一的代码风格。

自动化的对代码进行规范，包含两个方面

1、代码格式规范
2、Git 提交规范

## 二、Prettier 配置代码风格自动格式化

### 1、VS Code 保存时自动格式化

（1） 在 VSCode 中安装 prettier 格式化插件 【Prettier - Code formatter
】，格式化支持的文件类型有 `{js,jsx,vue,css,html,scss,md,json,wxml,wxss,wxs}`等。

（2） 保存时自动格式化（修改 VSCode 配置文件 **setting.json**）

```js
{
  "files.autoSave": "afterDelay", // 延时后保存
  "editor.formatOnSave": true, // 保存时自动格式化代码

  // 默认格式化插件 prettier
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // 每一种语言设置默认格式化规则
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
   "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
}
```

（3）配置自定义格式化规则

我们可以将格式化规则写在项目根目录的 `.prettierrc`（还支持 `prettierrc.js`） 配置文件或是保存在自己的 VSCode 配置文件 **setting.json** 中。

**.prettierrc**

```js
{
  "printWidth": 120, // 超过最大值换行
  "semi": true, //  要分号分号
  "singleQuote": false //  要单引号
}
```

**setting.json**

```js
{
  "editor.rulers": [120], // 辅助标尺
  // ! 自定义 prettier 格式配置
  "prettier.printWidth": 120, // 超过最大值换行
  "prettier.semi": true, // 句尾添加分号
  "prettier.singleQuote": false // 要单引号
  // ? 格式化 prettier end
}
```

> 建议将上面自定义 prettier 格式配置的内容单独放置在专门的配置文件中，这一点在多人开发统一规范很有必要。

（4）设置格式化过滤项文件（根目录`.prettierignore` 文件）

**.prettierignore**

```bash
# 忽略文件夹
build
coverage

# 过滤所有的 html 文件
*.html

# 过滤所有名为 ignore.js 的文件
ignore.js
```

忽略 prettier 代码格式

javascript

```js
// prettier-ignore
mattix(
1, 0, 0,
0, 1, 0,
0, 0, 1
)
```

html

```html
<!-- prettier-ignore -->
<div class='x'    >  hello world!</div>
```

css

```css
/* prettier-ignore*/
border: 1Px solid #0098e4;
```

### 2、Git 整合提交自动格式化

在 `git commit` 之前，先强制执行 prettier 格式化（防止某些成员开发期间不开启编辑器格式化）再提交。

（1）安装相关依赖

```bash
$ npm install pre-commit lint-staged prettier -D
```

> 安装 `pre-commit` 将会在 .git/hooks 文件夹下生成一个 `pre-commit` 文件，这个 Git 钩子可以让我们在提交代码前做一些事情。

（2）配置自动格式化钩子

```json
{
  "scripts": {
    "lint-staged": "lint-staged"
  },
  "pre-commit": "lint-staged",
  "lint-staged": {
    "*.{js,jsx,vue,css,html,scss,md,json,wxml,wxss,wxs}": ["prettier --write", "git add"]
  }
}
```

格式化命令行输出效果：

```bash
yue@03-709-6151 MINGW64 /d/Self/react-accounts-app (master)
$ git add .

yue@03-709-6151 MINGW64 /d/Self/react-accounts-app (master)
$ git commit -m "test: cmd commit"
[STARTED] Preparing...
[SUCCESS] Preparing...
[STARTED] Running tasks...
[STARTED] Running tasks for *.{js,jsx,vue,css,html,scss,md,json,wxml,wxss,wxs}
[STARTED] prettier --write
[SUCCESS] prettier --write
[SUCCESS] Running tasks for *.{js,jsx,vue,css,html,scss,md,json,wxml,wxss,wxs}
[SUCCESS] Running tasks...
[STARTED] Applying modifications...
[SUCCESS] Applying modifications...
[STARTED] Cleaning up...
[SUCCESS] Cleaning up...
[master e85957a] test: cmd commit
 1 file changed, 2 insertions(+)

yue@03-709-6151 MINGW64 /d/Self/react-accounts-app (master)
$ git push
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 4 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (5/5), 412 bytes | 412.00 KiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
To http://xxx.com/react-accounts-app.git
   316adfb..e85957a  master -> master

```

（3）配置自定义格式化规则（同上）

（4）设置格式化过滤项文件（同上）

#### 新版 husky 实践

**新版 husky 的工作原理**

新版的 husky 使用了从 git 2.9 开始引入的一个新功能 core.hooksPath。core.hooksPath 可以让你指定 git hooks 所在的目录而不是使用默认的.git/hooks/。这样 husky 可以使用 husky install 将 git hooks 的目录指定为.husky/，然后使用 husky add 命令向.husky/中添加 hook。通过这种方式我们就可以只添加我们需要的 git hook，而且所有的脚本都保存在了一个地方（.husky/目录下）因此也就不存在同步文件的问题了。

（1）安装 husky

```bash
npm install -D husky
```

（2）在 packgae.json 中添加 prepare 与 lint-staged 脚本

```json
{
  "scripts": {
    "prepare": "husky install",
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "*.{js,jsx,vue,css,html,scss,md,json,wxml,wxss,wxs}": ["prettier --write", "git add"]
  }
}
```

prepare 脚本会在 npm install（不带参数）之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 husky install 命令，该命令会创建.husky/目录并指定该目录为 git hooks 所在的目录。

（3）添加 git hooks，运行一下命令创建 git hooks

```bash
npx husky add .husky/pre-commit "lint-staged"
```

运行完该命令后我们会看到 `.husky/`目录下新增了一个名为 pre-commit 的 shell 脚本。也就是说在在执行 git commit 命令时会先执行 pre-commit 这个脚本。pre-commit 脚本内容如下：

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```

可以看到该脚本的功能就是执行 npm run lint-staged 这个命令

（4）其他人 npm install

注意下面的关键日志输出，该命令会创建.husky/目录并指定该目录为 git hooks 所在的目录，husky 配置的钩子就可以正常使用了。

```bash
> husky install

husky - Git hooks installed
```

```bash
$ npm i

> core-js@2.6.12 postinstall D:\Powerful\h5-editer\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
> https://opencollective.com/core-js
> https://www.patreon.com/zloirock

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> esbuild@0.12.8 postinstall D:\Powerful\h5-editer\node_modules\esbuild
> node install.js


> postinstall-postinstall@2.1.0 postinstall D:\Powerful\h5-editer\node_modules\postinstall-postinstall
> node ./run.js


> vite-vue-starter@0.0.0 prepare D:\Powerful\h5-editer
> husky install

husky - Git hooks installed
npm WARN vite-vue-starter@0.0.0 No repository field.
npm WARN vite-vue-starter@0.0.0 No license field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.3.2 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.3.2: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"ia32"})

added 615 packages from 1291 contributors and audited 616 packages in 84.989s

51 packages are looking for funding
  run `npm fund` for details

found 206 vulnerabilities (16 moderate, 190 high)
  run `npm audit fix` to fix them, or `npm audit` for details

```

**需要注意的点**

使用新版本 husky 进行配置后，下面这种配置方式就不再需要了，可以移除。

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```

### 3、小结

方案一：VS Code 保存时自动格式化。配置完成使用 `Ctrl+S` 保存代码就可以自动格式化了 ！由开发者来决定哪些文件需要格式化。

方案二：Git 整合提交自动格式化，配置完成后提交代码就可以自动格式化了 ！需要注意的是配置不需要格式化的过滤项文件。

其实，这两种方案也可以结合起来，在本地开发的时候进行自动格式化，提交前的时候也进行格式化操作，确保代码风格一致性。

## 三、ESlint 静态代码检查

初始化项目的时候已经安装了 ESLint 代码检测工具。ESLint 的目标就是**提供一个插件化的 JavaScript 代码检测工具**，就是做**代码格式检测使用的**。

初始化的项目中会包含一个.eslintrc.js 文件，这个文件就是 eslint 的配置文件，一些大厂也会基于这个规则的基础上做一些延伸。

下边以初始化项目的时候选择标准的 ESLint 规则（ESLint + Standard config）为例看一下 ESLint 的配置内容

.eslintrc.js

```js
// ESLint 配置文件遵循 commonJS 的导出规则，所导出的对象就是 ESLint 的配置对象
// 文档：https://eslint.bootcss.com/docs/user-guide/configuring
module.exports = {
  // 表示当前目录为根目录，ESLint规则被限制到该目录下
  root: true,
  // env表示启用ESLint检测的环境
  env: {
    // 在node环境下启动ESLint检测
    node: true
  },
  // ESLint中基础配置需要继承的配置
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  // 解析器
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 需要修改的启用规则及其各自的错误级别
  /**
   * 错误级别分为三种：
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off'
  }
}
```

14:9 error Strings must use singlequote quotes

触发了一个错误级别的错误，位于 14 行第 9 列，错误描述为"字符串 必须是用单引号"，错误规则为 quotes。

解决这个错误，通常有两种方式：

- 按照 ESLint 的要求修改代码（在 HomeView.vue 中修改代码，将双引号改为单引号）
- 修改 ESLint 的验证规则（在.eslintrc.js 中增加一条验证规则："quotes": "off" <error 默认，warn 警告，off 不校验>）

基于 ESLint，如果出现不符合规范的代码格式，就会得到一个对应的错误。

如下：

以上解决了 ESLint 的报错，但是团队中如果存在大量的 ESLint 规则校验，会让人头疼，也会影响项目的开发进度。这时候需要一个 prettier 插件，既可以保证 ESLint 规则校验，又可以解决严苛的格式规则导致对项目进度的影响

**Nuxt 项目引入**

nuxt 项目与 vue 项目有所不同。如果是新项目，可以使用官方脚手架工具 create-nuxt-app 创建项目，然后在后续选项中选择 eslint 和 prettier；

脚手架生成项目完成后，项目结构和 package.json 如下所示：

如果是老项目，需要参照官方模板项目；首先安装依赖：

```bash
npm i @babel/eslint-parser @nuxtjs/eslint-config @nuxtjs/eslint-module eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-nuxt eslint-plugin-vue prettier --save-dev
```

依赖说明：

`@nuxtjs/eslint-config` 是 nuxt 官方预设的 eslint 规则集，可以直接在源码中查看，如果要覆盖规则，可以在本地.eslintrc.js 中重写规则。

`@nuxtjs/eslint-module` 是一个 nuxt module，主要是在构建配置中注册 eslint-webpack-plugin 插件，让你在本地开发热更新过程中，对代码进行检查。

`eslint-config-prettier` 是 prettier 风格的 eslint 规则集，主要是为了让 prettier 自动格式化与 eslint 使用相同规则，不冲突。

`eslint-plugin-prettier` 这个插件的主要作用就是将 prettier 作为 ESLint 的规则来使用，相当于代码不符合 Prettier 的标准时，会报一个 ESLint 错误，同时也可以通过 eslint --fix 来进行格式化。

新建.eslintrc.js

```js
// ESLint 配置文件遵循 commonJS 的导出规则，所导出的对象就是 ESLint 的配置对象
// 文档：https://eslint.bootcss.com/docs/user-guide/configuring
module.exports = {
  // 表示当前目录为根目录，ESLint规则被限制到该目录下
  root: true,
  // env表示启用ESLint检测的环境
  env: {
    // 在node环境下启动ESLint检测
    node: true,
    browser: true
  },
  // ESLint中基础配置需要继承的配置
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  // 解析器
  // parser: '@babel/eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    // 指定ES版本，默认为5，某些require引入js会报错，修改为8后正常
    ecmaVersion: 8,
    requireConfigFile: false
  },
  // 需要修改的启用规则及其各自的错误级别
  /**
   * 错误级别分为三种：
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    'space-before-function-paren': 'off',
    'nuxt/no-cjs-in-config': 'off',
    // webpack异步import时可以不在最顶层
    // 'import/first': 'off',
    // TODO 兼容老项目关闭部分规则，待修复
    // ===要改成==
    eqeqeq: 'off',
    'no-prototype-builtins': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    // 正则相关 减少非必要的转义字符（不太懂）
    'no-useless-escape': 'off'
  },
  globals: {
    // 全局变量定义 writable 可修改 readonly 只读
    urlParams: 'writable',
    $nuxt: 'readonly',
    traceRecord: 'readonly',
    weui: 'readonly',
    WeixinJSBridge: 'readonly',
    wx: 'readonly'
  }
}
```

本地开发时开启 eslint

```js
export default {
  buildModules: ['@nuxtjs/eslint-module']
}
```

package.json 增加配置

```json
{
  "name": "nuxt-project",
  "version": "1.0.0",
  "description": "My polished Nuxt.js project",
  "private": true,
  "config": {
    "nuxt": {
      "host": "0.0.0.0",
      "port": "7711"
    }
  },
  "scripts": {
    "lint": "eslint --ext .vue pages/ --ext .vue components/prd --ext .js store/",
    "lint:fix": "eslint pages/* store/* components/prd/*.vue --fix"
  }
}
```

注：eslintIgnore 是为了配置 eslint 忽略文件，比如 assets 中的 json 和 rainbow-common 子模块
执行 lintfix 命令可以修复部分违反 eslint 规则的代码，你也可以设置保存自动修复；

```json
"settings": {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
```

## Commitlint git 提交规范

### 1. 约定式提交规范

实际开发中在 git commit -m 'xxxx'提交代码的时候经常会出现不清晰的提交表述，比如：修改了一个 bug、解决了几个问题、创建了一个文件，优化了一些代码等。不同的团队可能会有不同的标准，下边以目前使用较多的 Angular 团队规范延伸出的 Conventional Commits specification（约定式提交）为例来进行说明。
约定式提交规范要求如下

其中<type>类型，必须是一个可选的值，比如：新功能-feat、修复-fix、文档变更-docs ...等。目前的代码托管-GIT 分支管理模型现状要求就是得按照文档中的要求进行手写提交，但是每次这样手写的话会觉得是不是太麻烦，万一忘了怎么办，想随手做个提交怎么办？下边介绍一下借助 Commitizen 来规范提交代码。

### 2. Git Hooks

Git Hooks 又叫 git 钩子或者 git 回调方法 ，也就是说，git 在执行某个事件之前或之后进行的一些其他额外操作，我们只需要找到在 git 提交之前的钩子回调，并进行一些限制就可以阻止不合规的代码提交。

commit-msg：git commit 执行前 可用于将消息规范化为某种项目标准格式，还可用于在检查消息文件后拒绝提交。可以用来规范化标准格式，并且可以按需指定是否要拒绝本次提交。

pre-commit：git commit 执行前 它不接受任何参数，并且在获取提交日志消息并进行提交之前被调用。脚本 git commit 以非零状态退出会导致命令在创建提交之前中止。

接下来要做的在这两个钩子上面进行处理。

### 3、husky + commitlint 工具检查提交描述是否符合规范要求

（1）使用 commitlint

```bash
# 安装依赖
npm install @commitlint/config-conventional @commitlint/cli --save-dev
```

- 创建 commitlint.config.js 增加配置项（默认配置参考）

```js
module.exports = {
  // 继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则类型
  rules: {
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      // 0为disable，1为warning，2为error
      2,
      // 在什么情况下需要进行验证 never和always，never无视规则
      'always',
      // 泛型内容
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'docs', // 文档注释
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build' // 打包
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  }
}
```

> 注意：commitlint.config.js 的文件要保存为 UTF-8 编码格式的，否则会报错

（2）安装 husky

- 安装依赖：`npm install husky@7.0.1 --save-dev`
- 启动 hooks，生.husky 文件夹：`npx husky install`

命令行如下显示表示初始化完成。

```bash
PS D:\Cloud\xxx> npx husky install
husky - Git hooks installed
```

- 在 package.json 中添加 scripts 指令（ 需要 npm > 7.0 版本 ）：`"prepare": "husky install"`
- 将 commitlint 校验命令添加到 husky 的 commit-msg hook 中
  - Mac 用户执行：`npx --no-install commitlint --edit "$1"`
  - Windows 用户：手动在.husky 目录下创建 commit-msg 文件，填入以下内容

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

进行完以上两步之后，此时，不符合规范的 commit 将不可再提交。

### 4. 通过 pre-commit 检测提交时的代码规范

在编程规范部分已经使用了 ESLint+Prettier 解决了代码格式化问题，但这里还存在一个问题就是需要手动在 VSCode 的设置面板中配置自动保存并且也只是一个本地代码格式问题的处理，如果有人忘记开启自动保存的话，一旦进行提交也会造成代码格式混乱的问题产生。
使用 husky+eslint 进行避免以上问题的产生，思路就是 husky 监测 pre-commit 钩子，在该钩子下执行 `npx eslint --ext .js,.vue src` 指令来进行相关检测。

- 执行 `npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src"` 添加 commit 时的 hook （`npx eslint --ext .js,.vue src` 会在执行到该 hook 时运行）
- 该操作会生成对应的文件 `pre-commit`
- 关闭 VSCode 的自动保存功能
- 修改一处代码，使其不符合 ESLint 检验规则
- 执行提交操作，会抛出错误，代码无法提交

此时，需要提交代码就需要处理完所有的错误信息才可以进行提交，使用 pre-commit 就避免了不规范代码的提交

那针对上边的问题，是否可以在提交的时候，先自动检测代码规范，如果不规范的情况下自动将代码编程规范形式的再进行提交呢？这个就需要借助 lint-staged 来进行自动修复格式错误了

## 最佳实践：lint-staged 自动修复格式错误

在上文中，使用 pre-commit 在代码提交时可以检测出所有代码格式不规范的情况，真实开发时还会遇到如下两个问题：

（1）只修改了个别的文件，没有必要检测所有的文件代码格式
（2）它只能给我们提示出对应的错误，我们还需要手动的进行代码修改

针对上边两个小问题，可以借助 lint-staged 插件，该插件可以让你当前的代码检查**只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送**

- 依赖安装：`npm install lint-staged@9.5.0 --save-dev`
- 修改 package.json 配置

```json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint --ext .vue pages/ --ext .vue components/prd --ext .js store/",
    "lint:fix": "eslint pages/_ store/_ components/prd/_.vue --fix",
    "lint-staged": "lint-staged"
  },
  "lint-staged": {
    "pages/*.vue": ["eslint --fix", "prettier --write", "git add"],
    "store/*.js": ["eslint --fix", "prettier --write", "git add"]
  }
}
```

这样，在本地 commit 之前，会校验提交的内容是否符合本地配置配置的 eslint 规范，校验会出现两种结果：
（1）如果符合规则：则会提交成功。
（2）如果不符合规则：会自动执行 `eslint --fix` 尝试自动修复，如果修复成功则会把修复好的代码提交，如果失败，则会提示你错误，让你修好这个错误之后才能允许提交代码。

- 创建 `.husky/pre-commit` 文件

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

再次对符合 ESLint 规范的代码进行提交，会发现暂存区中不符合 ESLint 的内容，会被自动修复，修复成功后进行提交，最终提交成功

> 在安装依赖的时候 husky 版本 7.0.1、lint-staged 版本 9.5.0。这两个需要特殊指定一下版本，其他的使用最新的版本也是可以的，这两个依赖包尝试了一下使用最新版本的，会发现设置的没有生效，这个后续需要看一下最新版本的兼容处理，留为待完成内容。

## 参考链接

- [husky 自定义目录钩子的正确使用](https://blog.csdn.net/Banterise/article/details/115206267)
- [Git Commit Message 校验踩坑指南](https://zhuanlan.zhihu.com/p/391709116)
- [husky 使用总结](https://zhuanlan.zhihu.com/p/366786798)
