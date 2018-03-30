# smart

## 工具库

* [oui-dom-utils](https://github.com/oneuijs/oui-dom-utils) / [oui-dom-events](https://github.com/oneuijs/oui-dom-events)
* [lodash](https://github.com/lodash/lodash) - 现代 JavaScript 实用程序库提供模块化，性能，https://lodash.com/
* [Modernizr](https://github.com/Modernizr/Modernizr) - 检测用户浏览器中的 HTML5 和 CSS3 功能 https://modernizr.com

## HTML5

* [html5-boilerplate](https://github.com/h5bp/html5-boilerplate) - 一个专业的前端模板，用于构建快速，可靠的 Web 应用程序或网站。

### CDN

<details>
<summary>View contents</summary>

* [`ary`](#ary)
* [`call`](#call)
* [`collectInto`](#collectinto)
* [`flip`](#flip)
* [`over`](#over)
* [`overArgs`](#overargs)
* [`pipeAsyncFunctions`](#pipeasyncfunctions)
* [`pipeFunctions`](#pipefunctions)
* [`promisify`](#promisify)
* [`rearg`](#rearg)
* [`spreadOver`](#spreadover)
* [`unary`](#unary)

</details>

## git commit
````
# head: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: 
# - Include a link to the ticket, if any.
# - BREAKING CHANGE
#
````
名称 | 说明
---|---
type | commit 的类型
feat | 新特性
fix |修改问题
refactor| 代码重构
docs| 文档修改
style| 代码格式修改, 注意不是 css 修改
test|测试用例修改
chore| 其他修改, 比如构建流程, 依赖管理.
scope| commit 影响的范围, 比如: route, component, utils, build...
subject| commit 的概述, 建议符合 50/72 formatting
body|commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
footer| 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

**[⬆ 回到顶部](#smart)**
