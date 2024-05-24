## 概念入门

在项目开发中常会遇到这种情况：某个工作中的项目需要包含并使用另一个项目，或是我们独立开发的子项目需要同时用于多个父项目的库。在这种情况下既想两个项目独立分治，又想在一个项目中使用另一个。

在这种情况下，Git 子模块就派上用场了，子模块是项目级引用而有同时分治开发的相当简单有效的方法。子模块允许我们将一个 Git 仓库作为另一个 Git 仓库的子目录。它能让你将另一个仓库克隆到自己的项目中，同时还保持提交的独立。

**子模块 vs npm package**

- 开发场景，子模块可以区分环境，如使用分支管理
- 发布场景，子模块提交代码，保留子项目的 `commit id`，npm 需要提交 `publish`,然后主项目更新 `npm install`安装就会下载到最新版本的包（不锁定版本）

## 使用子模块

**给当前项目添加子模块**

```bash
#  为当前项目添加子模块，可以将远程仓库中额内容克隆下来
git submodule add -b dev http://gitlab.xxx/project-common.git
```

执行上面的命令，将在项目根目录 生成 `.gitmodule` 文件，记录子模块联系

```
[submodule "project-common"]
	path = /project-common
	url = http://gitlab.xxx/project-common.git
	branch = dev
```

**获取子模块内容或更新子模块**

项目已经添加过子模块了，但是别的同学下载下来文件夹是空的，`.gitmodule`文件已经有了，这时需要更新子模块，才可以把远程仓库中的内容下载下来

```bash
# 获取子模块内容或更新子模块内容
git submodule init

# 更新子模块为远程项目的最新版本
git submodule update --remote

# 或者使用组合指令
git submodule update --init --recursive
```

**删除子模块**

1. 删除子模块文件夹

```bash
git rm --cached project-common
rm -rf project-common
```

2. 删除 `.gitmodules` 文件中相关子模块的信息

```bash
rm -rf .gitmodules
```

3. 删除 `.git/config` 中相关子模块的信息，类似于

```
[submodule "project-common"]
	url = http://gitlab.xxx/project-common.git
	active = true
```

4. 删除 `.git` 文件夹中的相关子模块文件

```bash
rm -rf .git/modules/project-common
```

**错误信息帮助**

```bash
# 如果报错提示：'project-common' already exists in the index.
# 执行命令：
git rm -f --cached project-common
# 清除 git 缓存再执行 add 命令

# 如果报错提示： 'project-common' already exists and is not a valid git repo
# 删除 project-common 文件夹 再执行 add 命令
rmdir project-common

# 直接一步到位初始化子模块
git rm -f --cached project-common && rmdir project-common && git submodule add -b dev http://gitlab.xxx/project-common.git

# 如果提示：A git directory for 'project-common' is found locally with origin(s):
# 进入 .git/module，删除相关仓库文件夹
```

## 构建发布

使用了子模块的项目发布不太一样，在部署环境需要将子模块初始化完毕后才可以构建，以下提供比较成熟的发布方案。

(1) shell 配合 npm scripts 使用

package.json

```json
{
  "scripts": {
    "serve": "cross-env PATH_TYPE=development nuxt",
    "dev": "sh build.sh dev",
    "generate": "sh build.sh generate"
  }
}
```

build.sh

```sh
rm -rf rainbow-common
echo "EXEC npm install"
npm install
if [[ $1 == "dev" ]]; then
    echo "EXEC git clone -b dev http://gitlab.xxx/project-common.git"
    git clone -b dev http://gitlab.xxx/project-common.git
    echo '开始编译测试环境'
    cross-env PATH_TYPE=trial nuxt generate
    exit
fi

if [[ $1 == "generate" ]]; then
    echo "EXEC git clone -b submodule-master http://gitlab.xxx/project-common.git"
    git clone -b submodule-master http://gitlab.xxx/project-common.git
    echo '开始生产环境编译'
    cross-env PATH_TYPE=production  nuxt generate
    exit
fi

echo '请指定编译方式  dev 或者 generate'
```

（2）nodejs 配合 npm scripts 使用

package.json

```json
{
  "scripts": {
    "serve": "cross-env PATH_TYPE=development nuxt",
    "dev": "cross-env PATH_TYPE=development node build.js",
    "generate": "cross-env PATH_TYPE=production node build.js"
  }
}
```

build.js

```js
const { spawnSync } = require('child_process')
// 运行命令
const execute = function(command, args = [], options = {}) {
  console.log(`EXEC ${command} ${args.join(' ')}`)
  spawnSync(command, args, {
    stdio: 'inherit',
    encoding: 'utf-8',
    ...options
  })
}

try {
  const isProduction = process.env.PATH_TYPE === 'production'
  // 自己控制 install
  execute(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['install'], {})
  // clone project-common
  execute(`git clone -b ${isProduction ? 'submodule-master' : 'dev'} http://gitlab.xxx/project-common.git`, [], {
    shell: true
  })
  // building
  console.log(`开始编译${isProduction ? '生产' : '测试'}环境`)
  execute(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'generate'], {
    env: {
      ...process.env,
      PATH_TYPE: isProduction ? 'production' : 'trial'
    }
  })
} catch (err) {
  console.log(err)
}
```

## 参考链接
