## 前言

随着 git 的使用普遍化，现在更需要关注使用的规范流程，在此纪录。

## 目录

- [漂亮的徽章](#漂亮的徽章)
- [commit 日志](#commit-日志)
- [更好的 pull](#更好的-pull)
- [rebase-修改提交历史](#rebase-修改提交历史)
- [merge 时忽略文件](#merge-时忽略文件)
- [git rebase vs git merge](#git-rebase-vs-git-merge)
- [分支管理策略](#分支管理策略)
- [git 仓库迁移并保留 commit 历史](#git-仓库迁移并保留-commit-历史)
- [git 子模块](#git-子模块)
- [git-创建一个空分支](#git-创建一个空分支)
- [git stash](#git-stash)
- [git cherry-pick](#git-cherry-pick)
- [git revert 与 git reset 的区别](#git-revert-与-git-reset-的区别)
- [git 合并另一个仓库](#git-合并另一个仓库)
- [git 修改 commit 作者和邮箱](git修改commit作者和邮箱)
- [github 搜索](#github-搜索)

## 漂亮的徽章

（1） 持续集成

[![Build Status](https://camo.githubusercontent.com/ebc361bebee07a3f80929c3016b9482f5fdcf456b861bd720c58120f3eee37d0/68747470733a2f2f7472617669732d63692e6f72672f79616e7975653430342f6164644b65792e7376673f6272616e63683d6d6173746572)](https://travis-ci.org/yanyue404/addKey) [![codecov](https://camo.githubusercontent.com/830406df23d4e39516e0b932b2b98c95e713962847c25366bfefd9981a119c61/68747470733a2f2f636f6465636f762e696f2f67682f79616e7975653430342f6c656574636f64652f6272616e63682f6d61737465722f67726170682f62616467652e737667)](https://codecov.io/gh/yanyue404/leetcode)

（2） npm

[![NPM version](https://camo.githubusercontent.com/2c48021aab4caf5b59c791b41c1c3e944ad081c28148b1b06a900502116a0909/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6164646b65792e7376673f7374796c653d666c6174)](https://www.npmjs.com/package/addkey) [![NPM monthly downloads](https://camo.githubusercontent.com/f652b519500a5b0c14cad99d163692dddd625a27f6b53fde6b20221ff7751fa3/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f6164646b65792e7376673f7374796c653d666c6174)](https://npmjs.org/package/addkey) [![NPM total downloads](https://camo.githubusercontent.com/603e6519564ae2cde904a177698aff5aa4c58709e5b60ddded948ada0cb9435a/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f64742f6164646b65792e7376673f7374796c653d666c6174)](https://npmjs.org/package/addkey) [![gzip size](https://camo.githubusercontent.com/814ba22a452d2b9a188a5c6405789a7e2c969ebb9e73f830ad9315be2da7fc8e/687474703a2f2f696d672e626164676573697a652e696f2f68747470733a2f2f756e706b672e636f6d2f7072656163742f646973742f7072656163742e6d696e2e6a733f636f6d7072657373696f6e3d677a6970)](https://camo.githubusercontent.com/814ba22a452d2b9a188a5c6405789a7e2c969ebb9e73f830ad9315be2da7fc8e/687474703a2f2f696d672e626164676573697a652e696f2f68747470733a2f2f756e706b672e636f6d2f7072656163742f646973742f7072656163742e6d696e2e6a733f636f6d7072657373696f6e3d677a6970)

（3） 自定义

可以自定义修改 左侧 label 文字，右侧颜色

[![GitHub](https://camo.githubusercontent.com/56188fe66d6a0ea331ef136fdb49a20c7db3b9c69552f2322d4bb19c3949fa18/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f79616e7975653430342f6164644b65793f636f6c6f723d253233303030303030266c6162656c3d254535254243253830254536254241253930254535253844253846254538254145254145)](https://camo.githubusercontent.com/56188fe66d6a0ea331ef136fdb49a20c7db3b9c69552f2322d4bb19c3949fa18/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f79616e7975653430342f6164644b65793f636f6c6f723d253233303030303030266c6162656c3d254535254243253830254536254241253930254535253844253846254538254145254145) [![](https://camo.githubusercontent.com/7c50175252ff8dd80924697ba2050171906ffa5b3325fabdf46f1314db46e51a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747769747465722d4045797265467265653737372d626c75652e7376673f636f6c6f72413d616263646566)](https://camo.githubusercontent.com/7c50175252ff8dd80924697ba2050171906ffa5b3325fabdf46f1314db46e51a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747769747465722d4045797265467265653737372d626c75652e7376673f636f6c6f72413d616263646566) [![](https://camo.githubusercontent.com/ec4d3ef49eeacf00b3e1d9d240ecf111b7bdc2a218b75ce83e2dd630bbc19863/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747769747465722d4045797265467265653737372d626c75652e7376673f636f6c6f72423d616263646566)](https://camo.githubusercontent.com/ec4d3ef49eeacf00b3e1d9d240ecf111b7bdc2a218b75ce83e2dd630bbc19863/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747769747465722d4045797265467265653737372d626c75652e7376673f636f6c6f72423d616263646566) [![GitHub issues](https://camo.githubusercontent.com/2da67d3d906c2649eed2a98f322b0215a8f04037f8c6553f21a90dfaf1a8e988/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d7261772f79616e7975653430342f626c6f673f636f6c6f723d67726565266c6162656c3d626c6f67266c696e6b3d68747470733a2f2f6769746875622e636f6d2f79616e7975653430342f626c6f672f697373756573)](https://camo.githubusercontent.com/2da67d3d906c2649eed2a98f322b0215a8f04037f8c6553f21a90dfaf1a8e988/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d7261772f79616e7975653430342f626c6f673f636f6c6f723d67726565266c6162656c3d626c6f67266c696e6b3d68747470733a2f2f6769746875622e636f6d2f79616e7975653430342f626c6f672f697373756573)

（4） 其他

[![Badge](https://camo.githubusercontent.com/3e8b8686464bdeeef002f8f8ff1883c5a713366d58360ab9a61dbab60a2eb1f0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c696e6b2d3939362e6963752d2532334646344435422e7376673f7374796c653d666c61742d737175617265)](https://996.icu/#/zh_CN) [![GitHub issues](https://camo.githubusercontent.com/23ab650cb988eb3fb2e6a63be6a68d297b97afbc179d6623d200fbd12705247d/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d7261772f79616e7975653430342f626c6f673f636f6c6f723d253233326663623533)](https://camo.githubusercontent.com/23ab650cb988eb3fb2e6a63be6a68d297b97afbc179d6623d200fbd12705247d/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6973737565732d7261772f79616e7975653430342f626c6f673f636f6c6f723d253233326663623533) [![](https://camo.githubusercontent.com/7d528034de9e820df7723725e5dbdda1fcb33a7f3331294ef2858609cb641673/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f747769747465722d79616e7975653430342d626c75652e737667)](https://twitter.com/yanyue404) [![GitHub last commit](https://camo.githubusercontent.com/4405253d0f23464bec0b29a82b77ea6c0a3b44f5f93ae328f7f742400c4d2607/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6173742d636f6d6d69742f79616e7975653430342f6164644b6579)](https://camo.githubusercontent.com/4405253d0f23464bec0b29a82b77ea6c0a3b44f5f93ae328f7f742400c4d2607/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6173742d636f6d6d69742f79616e7975653430342f6164644b6579) [![GitHub](https://camo.githubusercontent.com/a3045cd8510e0ef4494805da4fdaa0a01b00b35ab9a281f5c701dec95c4455a3/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f79616e7975653430342f6164646b6579)](https://camo.githubusercontent.com/a3045cd8510e0ef4494805da4fdaa0a01b00b35ab9a281f5c701dec95c4455a3/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f79616e7975653430342f6164646b6579)

## commit 日志

- docs: 文档类修改
- feat: 新特性
- fix: bug 修改
- test: 新增、修改测试
- refactor: 重构代码
- perf: 性能优化
- build: 构建发布版本
- ci: 持续集成修改
- chore: 琐事，小修改
- revert: 版本回退

## 更好的 pull

**起因**

![](https://github.com/yanyue404/blog/blob/master/assets/git/pr1.jpg?raw=true)

![](https://github.com/yanyue404/blog/blob/master/assets/git/pr2.jpg?raw=true)

```shell
git pull origin xxx --rebase

# 直接按 rebase 的方式执行 pull
git config --global pull.rebase true
```

使用 rebase 就感觉所有人都在同一条直线上开发一样，很干净的 log，看着很舒服，而直接使用 pull 的 log 看起来就很乱。

**git pull --rebase**

```js
* | b9feea8 - chore: 添加C前往A埋点 (6 hours ago) <yanyue404>
* | b3047fe - fix: ISO8601 time (6 hours ago) <yanyue404>
* | bfb6c84 - test: formatTimeStr 兼容 ios (7 hours ago) <yanyue404>
* | 0e13196 - chore: IOS 时间处理 (22 hours ago) <yanyue404>
* | f15a0e8 - chore: 游客在名片页面进行授权 (24 hours ago) <yanyue404>
* | ee8b125 - chore: 完善个人名片 (25 hours ago) <yanyue404>
* | deb7a5a - chore: 个人名片添加用户角色校验 (26 hours ago) <yanyue404>
* | 5106b02 - chore: 开始识别用户角色 (27 hours ago) <yanyue404>
* | f16b6af - chore: 更换 appid (31 hours ago) <yanyue404>
* | 7216da4 - chore: 同步 code (31 hours ago) <yanyue404>
* | 9e542b4 - chore: uat 更新 (6 days ago) <yanyue404>
* | 473e311 - fix: 修改环境 (6 days ago) <yanyue404>
* | f54ae0f - chore: 埋点 (5 hours ago) <yanyue404>
```

**git pull**

```js
* | ae57454 - feat: token 过期强制重新认证 (2 days ago) <yanyue404>
* |   1b02194 - Merge remote-tracking branch 'origin/prod' into prod (2 days ago) <Joe>
|\ \
| * | 6284b85 - fix: 登录流程短视频播放 (2 days ago) <yanyue404>
| * | 2bcb162 - styles: canvas 分享图位置优化 (2 days ago) <yanyue404>
| * | d4c66a6 - chore: 页面分享控制 (2 days ago) <yanyue404>
| * | 91baa28 - chore: 个人名片非分享人文字修改 (2 days ago) <yanyue404>
* | | 60715e9 - 修改保单判断 (2 days ago) <Joe>
|/ /
* |   85f1032 - Merge remote-tracking branch 'origin/prod' into prod (2 days ago) <Joe>
|\ \
| * | ab884df - feat: 个人名片分享页授权 (4 days ago) <yanyue404>
* | | e603434 - 优化加载速度 (2 days ago) <Joe>
|/ /
* | a255e59 - 微调样式  评论换行 (4 days ago) <Joe>
* |   7251630 - Merge remote-tracking branch 'origin/prod' into prod (4 days ago) <Joe>
|\ \
| * | 1bd08fc - chore: loading 优化 (4 days ago) <yanyue404>
* | | 7bc0e9e - 修改视频列表问题 (4 days ago) <Joe>
|/ /
* | 9e328af - 1.取消我的视频    个人名片换上来 (4 days ago) <Joe>
```

## rebase-修改提交历史

合并最近提交的历史，将 `ba4358d`到 `a549037` 变为一个 commit

```shell
# 输入
git log --online

# 输出
ba4358d (HEAD -> master, origin/master, origin/HEAD) docs: 重
ba4358d Update README.md
ba4358d Update README.md # 此条目以上合并为一条
36f95d9 docs
0312afb init
```

准备合并

```shell
git rebase -i 36f95d9 | git rebase -i HEAD~3
```

选择合并

```shell
# 输出

pick ba4358d   '注释**********'

pick ba4358d   '注释*********'

pick ba4358d   '注释**********'

# pick 保留该commit（缩写:p）
# squash 的意思是这个 commit 会被合并到前一个commit (省略写法 s)
# reword：保留该commit，但我需要修改该commit的注释（缩写:r）
# edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
# fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
# drop：我要丢弃该commit（缩写:d）
# 在 vim 命令下输入 i 进入编辑模式，编辑完成后 :eq 保存退出

# 输入

pick 3ca6ec3   '注释**********'

s 1b40566   '注释*********'

s 53f244a   '注释**********'
```

保存完成后，你有两个选择

```shell
git rebase --continue  #  确认 rebase
git rebase --abort     # 取消 rebase

#确认后，就可以上传到远程了。
```

如有冲突：当你修改完冲突的文件：执行`git add .`，然后继续 `git rebase --continue`就可以解决完冲突并合并到分支上了。

如果没有冲突，或者冲突已经解决，则会出现如下的编辑窗口, 输入`:wq` 保存并推出:

```shell
# This is a combination of 4 commits.
#The first commit’s message is:
注释......
# The 2nd commit’s message is:
注释......
# The 3rd commit’s message is:
注释......
# Please enter the commit message for your changes. Lines starting # with ‘#’ will be ignored, and an empty message aborts the commit.
```

查看历史，已经改变

```shell
git log --oneline
d2d71a5 (HEAD -> master) Update README.md
36f95d9 docs
0312afb init
```

```shell
git push -f  # 强制覆盖远程
git commit --amend -m "新的注释" # 修改最新的 git commit 注释
```

## merge 时忽略文件

> **提醒**： 只能 master 合并其他分支时忽略其他分支上的文件, 其他分支合并 master 无法忽略 master 上的文件. （master 为默认主分支）

1.  创建自定义 merge driver

```shell
git config --global merge.ours.driver true
```

2.  在要被 merge 的分支上创建.gitattributes 文件,并且在文件中置顶不 merge 的文件名

```shell
project.config.json merge=ours
fetch.js merge=ours
app.js merge=ours
```

3.  回到要合并到的分支 master,执行 merge:

```shell
git merge --no-ff uat
```

> `--no-ff` 参数表示不使用 Fast forward 模式，保留分支合并的记录，加上`-m` 参数，把本地合并的 commit 描述写进去

在 `uat` 分支上的`project.config.json`、`fetch.js`、`app.js` 就不会被合并了 ！

## git rebase vs git merge

本地分支：

- uat （主开发分支）
- develop-yue （个人独立开发分支）

merge 命令：它会把两个分支的最新快照以及二者最近的共同祖先进行三方合并，合并的结果是生成一个新的快照（并提交）。

rebase 命令：它将提交到某一分支上的所有修改都移至另一分支上，就好像“重新播放”一样。

> 先进行 rebase 处理再进行 merge 并入，可以使得提交历史更加整洁，提交历史是一条直线没有分叉。

例子：

```shell
# 在自己的分支开发完成后（如果不在切换至自己的分支）
git co develop-yue

# 在自己的开发分支执行基于 uat 分支的变基操作，提取 develop-yue 的进度应用到 uat 的基础上
git rebase uat

# 切换至 uat
git co uat

# 进行一次性快速合并
git merge develop-yue
```

**develop-yue 日志**

```shell
* ee4ceb2 - (HEAD -> develop-yue, origin/develop-yue) chore: 补充日志信息 (14 seconds ago) <yanyue404>
* 8ef82e1 - docs: rebase.md (2 minutes ago) <yanyue404>
* 9d8e3e9 - (origin/uat, origin/develop-yue, uat) 优化细节 (54 minutes ago) <Joe>
*   9290637 - Merge remote-tracking branch 'origin/uat' into uat (57 minutes ago) <Joe>
|\
| * 0f0b5f7 - chore: 订单管理账号校验 (60 minutes ago) <yanyue404>
| * 8cf0fb6 - chore: button 样式重置 (76 minutes ago) <yanyue404>
| *   b859a6e - style: 合并 yue 分支整理 (2 hours ago) <yanyue404>
| |\
| | * b93e268 - chore: 打开注释 (2 hours ago) <yanyue404>
| | *   8ca3e6a - Merge branch 'uat' into develop-yue (2 hours ago) <yanyue404>
| | |\
| | |/
| |/|
| | * eb95bbc - style: 设置所有需要禁用分享的列表 (2 hours ago) <yanyue404>
| | * e129f08 - style: 玩转星福的问答评论删除控制 (3 hours ago) <yanyue404>
| | *   455097e - Merge branch 'uat' into develop-yue (7 hours ago) <yanyue404>
| | |\
* | | | 7f095fb - 提交漏提代码 (69 minutes ago) <Joe>
|/ / /
* | |   58b7ccd - Merge branch 'devlop-li' into uat (2 hours ago) <lijunxaio>
|\ \ \
| * | | 9c5c4a9 - 修改转发 (2 hours ago) <lijunxaio>
| * | | 57b90f2 - 修改文章详情转发 (7 hours ago) <xuyiqun>
| * | |   b5258e8 - Merge branch 'uat' into devlop-li (8 hours ago) <xuyiqun>
...
```

**uat 日志**

```shell
* ee4ceb2 - (HEAD -> uat, origin/develop-yue, develop-yue) chore: 补充日志信息 (2 minutes ago) <yanyue404>
* 8ef82e1 - docs: rebase.md (4 minutes ago) <yanyue404>
* 9d8e3e9 - (origin/uat) 优化细节 (58 minutes ago) <Joe>
*   9290637 - Merge remote-tracking branch 'origin/uat' into uat (61 minutes ago) <Joe>
|\
| * 0f0b5f7 - chore: 订单管理账号校验 (63 minutes ago) <yanyue404>
| * 8cf0fb6 - chore: button 样式重置 (80 minutes ago) <yanyue404>
| *   b859a6e - style: 合并 yue 分支整理 (2 hours ago) <yanyue404>
| |\
| | * b93e268 - chore: 打开注释 (2 hours ago) <yanyue404>
| | *   8ca3e6a - Merge branch 'uat' into develop-yue (2 hours ago) <yanyue404>
| | |\
| | |/
| |/|
| | * eb95bbc - style: 设置所有需要禁用分享的列表 (2 hours ago) <yanyue404>
| | * e129f08 - style: 玩转星福的问答评论删除控制 (3 hours ago) <yanyue404>
| | *   455097e - Merge branch 'uat' into develop-yue (7 hours ago) <yanyue404>
| | |\
* | | | 7f095fb - 提交漏提代码 (73 minutes ago) <Joe>
|/ / /
* | |   58b7ccd - Merge branch 'devlop-li' into uat (2 hours ago) <lijunxaio>
|\ \ \
| * | | 9c5c4a9 - 修改转发 (2 hours ago) <lijunxaio>
| * | | 57b90f2 - 修改文章详情转发 (7 hours ago) <xuyiqun>
| * | |   b5258e8 - Merge branch 'uat' into devlop-li (8 hours ago) <xuyiqun>
| |\ \ \
| | | |/
...
```

## 分支管理策略

（1）git flow 工作流

**主线分支（长期维护）**

- `master`：主干分支，，这个分支最近发布到生产环境的代码，最近发布的 Release， 这个分支只能从其他分支合并，不能在这个分支直接修改，每个 Commit 都应该打 Tag （对应线上生产环境）
- `develop`： 开发分支，各个任务分支都往这上边合并

**辅助分支**

- `feature-new`：新任务分支（服务于 develop），开发完毕应该合并到 develop（没写完就不要合进去了，不然影响 release，合并完建议删除）
- `release-vxxx`：可以理解为发版分支，基于 develop ，一定周期内的开发任务统一在一个 release 中测试，测试中出现的 BUG 直接 commit 在 release 分支中，测试完毕后后并入到 develop 与 master
- `hotfix` ：热修复分支（服务于 master），一般用于处理紧急 BUG，开发完毕后合并到 develop 以及 master

![](https://github.com/yanyue404/blog/blob/master/assets/git/git%20flow.png?raw=true)

开发分支 develop:

```shell
# 创建 develop 分支
git co -b develop master

# 将 develop 分支发布到 master
git co master
git merge --no-ff develop
```

任务（功能）分支 feature：

```shell
# 创建一个功能分支
git co -b feature-x develop

# 开发完成后，将功能分支合并到develop分支
git co develop
git merge --no-ff feature-x

# 删除 feature 分支
git branch -d feature-x
```

发版分支 release：

```shell
# 创建一个预发布分支
git co -b release-1.2 develop

# 确认没有问题，合并到 master（有问题直接在此分支修改）
git co master
git merge --no-ff release-1.2
git tag -a 1.2 # 对合并生成的新节点，做一个标签

# 再合并到 develop 分支
git co develop
git merge --no-ff release-1.2

# 最后，删除预发布分支
git branch -d release-1.2
```

热修复分支 hotfix：

```shell
# 创建一个修补bug分支
git co -b fixbug-1.7.2 master

# 修补结束后，合并到master分支
git co master
git merge --no-ff fixbug-1.7.2
git tag -a 1.7.2

# 再合并到develop分支
git co develop
git merge --no-ff fixbug-1.7.2

# 最后删除热修复分支
git branch -d fixbug-1.7.2
```

（2） 我们使用的模型

**主线分支**

- `prod`: 主干分支，相当于 master + release
- `uat`: 开发分支（dev）

**辅助分支**

- `dev-yue`：新任务分支（按人划分，服务于 uat）
- `dev-joe`：新任务分支

下面是合并分支常规操作，自己的开发分支并入 dev（uat） 分支。

```shell
# 先切换 uat 拉取最新 code，因为 merge 的时候选取的是本地分支
git co uat
git pull --rebase

# 切回 个人开发分支获取 uat 最新 code
git co dev-yue
git rebase uat # 变基，有冲突在处理冲突后提交

# 切回 uat 分支并入自己提交的 code
git co uat
git merge --no-ff dev-yue # 变基后重新 merge 可以使得提交历史一条直线
git push

# 1. uat 环境测试通过 2. prod 需要发版时合并 uat 修改
git co prod
git merge --no-ff uat # 必须 merge，因为 uat 与 prod有部分配置性文件不完全一致
```

## git 仓库迁移并保留 commit 历史

1. 先将需要保存到新远端的分支迁到本地分支保存。
2. 修改远端仓库地址：

```shell
# 修改已注册的远端仓库地址
git remote set-url origin [newUrl]
```

> newUrl 为 `http://gitlab.xxx.com/todomvc-demos.git` 格式。 3. 选择所有的分支 **push all branchs**。 4. 访问新远端项目地址，分支已经迁移完毕。

## git 子模块

在一个项目中使用另一个项目，并保证项目间相对独立，这就是 git 的子模块可以实现的效果。

**创建子模块**

先进入父仓库目录下，然后执行命令：

```bash
git submodule add -b <分支名> <仓库地址> <本地路径>
```

执行上面命令后，在父仓库根目录增加了.gitmodule 文件。

```bash
[submodule "submodule-name"]
	path = submodule-name
	url = http://gitlab.it.xxx.com/submodule-name.git
	branch = dev

```

**git 子模块使用**

```bash
# 初始化本地子项目配置
 git subnodule init

# 拉取子仓库文件
 git subnodule update --remote

# 或者使用组合指令
git submodule update --init --recursive
```

**git clone 子模块参与编译**

使用了子模块的项目并不会将子模块的所有代码提交上去，而会保留一个空文件夹与版本 id 指向 （submodule-name @ 462b5421），在真实编译发布的时候需要先 clone。

```bash
git clone -b dev http://gitlab.it.xxx.com/submodule-name.git
```

## git-创建一个空分支

1. 创建分支

使用 git checkout 的--orphan 参数，该命令会创建一个名为 doc 的分支，并且该分支下有前一个分支下的所有文件。

```bash
git checkout --orphan new-branchName
```

2. 删除所有内容我们不想提交任何内容，所以我们需要把当前内容全部删除，用 git 命令：

```bash
git rm -rf .
```

3. 提交分支使用 commit 命令来提交分支

```bash
git commit -am "new branch for documentation"
```

如果没有任何文件提交的话，分支是看不到的，可以创建一个新文件后再次提交则新创建的 branch 就会显示出来。

4. 使用 branch 来查看分支是否创建成功

```bash
git branch -a
```

## git stash

```shell
# 暂时将未提交的变化移除，方便做其他操作
git stash

# 移入之前缓存的工作区修改
git stash pop

# 查看缓存的 stash 列表
git stash list
```

````
## git cherry-pick

作用：将指定的提交应用于当前分支, 这会在当前分支生成对应的新提交；

```shell
# 转移到一次提交到当前分支
git cherry-pick <commitID>

# 转移多次提交
git cherry-pick <commitID_A> <commitID_B>
````

如果遇到冲突后，可以：

保存完成后，你有两个选择

```shell
git cherry-pick --continue  #  确认 cherry-pick，继续执行
git cherry-pick --abort     # 取消 cherry-pick, 回到操作前的样子
```

## git revert 与 git reset 的区别

**git reset** 可以回退 Git 的历史记录。例如当前分支有三个记录，并且 HEAD 指向 c 记录：

```bash
c <- HEAD
b
a
```

如果我们想回退到 b 记录，只要执行 **git reset b** 就可以了：

```
b <- HEAD
a
```

接着使用 **git push -f** 将回退版本后的分支强制推送到远程仓库，这样本地分支和远程分支就同步了。

```
git push -f
```

**git revert**  也可以撤销记录，只不过它撤销的记录不会消失，这一点和  **git reset**  不一样。**git reset**  撤销的记录就跟消失了一样。

现在我们用  **git revert**  来重新演示下刚才的操作：

```
c
b
a
```

如果我们执行  **git revert b**，则会在当前分支上再生成一个新的 commit 记录，变成  **a b c b'**，这个  **b'**  的状态和记录  **b**  是一样的。

也就是说，执行  **git reset b**  后，当前的分支记录会变成  **a b**。执行  **git revert b**  后，当前的分支记录会变成   **a b c b'**。

如果你想让别人知道你撤销过记录，就使用  **git revert**，因为它会留下撤销的记录，否则用  **git reset**。

## git 合并另一个仓库

基于一个 git 脚手架项目基础上开发了一个新项目，同时这个脚手架项目也会更新迭代，这时就需要把脚手架项目合并到新开发的项目中来，编译同步合并脚手架项目仓库的代码。

1. 在新项目初始化好后添加需要合并的远程仓库。

```
$ git remote add target http://aa.com//0033.git
```

把 target 作为远程仓库，添加到本地仓库 origin 中，设置别名 target。

2. 把 target 远程仓库中的数据抓取到本仓库

```
$ git fetch target

  remote: Enumerating objects: 576, done.
  remote: Counting objects: 100% (576/576), done.
  remote: Compressing objects: 100% (385/385), done.
  remote: Total 576 (delta 284), reused 462 (delta 174), pack-reused 0
  Receiving objects: 100% (576/576), 1.23 MiB | 7.75 MiB/s, done.
  Resolving deltas: 100% (284/284), done.
  From http://aa.com/0033
  * [new branch]      dev        -> target/dev
  * [new branch]      master     -> target/master
```

3. 基于想要取的 target 远程目标分支创建为新项目的一个分支

```
$ git checkout -b 0033 target/dev
  Switched to a new branch '0033'
  Branch '0033' set up to track remote branch 'dev' from 'target'.
```

4. 合并

```
git checkout dev
git merge 0033 --allow-unrelated-histories
```

在上面执行 merge 后追加 **--allow-unrelated-histories**，是为了避免因两个分支没有取得联系而报 **fatal: refusing to merge unrelated histories** 的错误信息。

## github actions

https://github.com/yanyue404/my-bookmarks

> https://github.com/yanyue404/my-bookmarks/blob/master/.github/workflows/vuepress-deploy.yml

## github.dev 写作

https://github.dev/yanyue404/my-bookmarks

## git 修改 commit 作者和邮箱

**原因**

没有为项目做 git 上的配置，于是使用了全局的 git 配置。

设置项目级：

```
git config user.name "yanyue404"
git config user.email "xiaoyueyue165@gmail.com"
```

> 在当前项目下面查看的配置是全局配置+当前项目的配置：git config --list

将所有错误的 name，email 修改为正确的配置。

下面通过`git rebase -i`  命令 重写历史

选择修改范围

```
git rebase -i HEAD~n
```

输出如下

```
pick 208d348 XXX\
pick c99c75e CCC\
pick 35c4d4c FFF

# Rebase 02097a2..35c4d4c onto 02097a2 (3 commands)\
#\
# Commands:
```

将要修改的提交所在行 pick 改为 e 保存退出 （e 是 edit 的意思）

通过命令一条一条修改 (无法修改时先执行 rebase 的 continue 命令再修改 commit )

```
git commit --amend --author "username <abcdef@gmail.com>"
git rebase --continue
```

直至

```
git rebase --continue\
Successfully rebased and updated refs/heads/master.
```

可以推送了

```
git push -f
```

**补充推荐：一个更快的方法**

修改仓库的配置文件（`.git/config`）

```bash
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://github.com/yanyue404/fe-attitude.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
	remote = origin
	merge = refs/heads/master
[user]
	name = yanyue404
	email = xiaoyueyue165@gmail.com
[http]
	proxy = http://127.0.0.1:33210
[https]
	proxy = http://127.0.0.1:33210
```

## github 搜索

- https://github.com/biaochenxuying/blog/issues/75

## 参考链接

- [Git 使用规范流程](http://www.ruanyifeng.com/blog/2015/08/git-use-process.html)，by 阮一峰
- [Git 分支管理策略](http://www.ruanyifeng.com/blog/2012/07/git.html)，by 阮一峰
- [git cherry-pick 教程](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)，by 阮一峰
- [Git 远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)，by 阮一峰
- [廖雪峰 - 分支管理策略](https://www.liaoxuefeng.com/wiki/896043488029600/900005860592480)
- [Git 在团队中的最佳实践--如何正确使用 Git Flow](https://www.cnblogs.com/wish123/p/9785101.html)
- [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
- [https://stackoverflow.com/questions/15232000/git-ignore-files-during-merge](https://stackoverflow.com/questions/15232000/git-ignore-files-during-merge)
- [GitHub 项目徽章的添加和设置](https://juejin.im/entry/6844903476498022414)
- [https://shields.io/](https://shields.io/)
- [分支的整合：git rebase Or git merge](https://zhuanlan.zhihu.com/p/34592377)
- [Git 工具 - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)
- [在 GIT 中创建一个空分支](https://segmentfault.com/a/1190000004931751)
- [一些常用的 Git 进阶知识与技巧](https://juejin.cn/post/7022746201598459940?utm_source=gold_browser_extension)
- [Git 学习之路](https://www.jianshu.com/p/50493c59c376)
