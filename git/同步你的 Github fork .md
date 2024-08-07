## 前言

选择拥抱开源，无疑参与 `github`的开源项目是最好的选择,先从同步 fork 仓库开始做起！

## 一、确认本地 fork 仓库版本是否落后于原仓库

### 1. 查看 github fork 仓库后的 `commit`数量及提交日志

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36eil8exij20zs0nqn0d.jpg)

本地 `clone` 自己仓库 后的 `commit log` 日志，与 gihub 上一致

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36eo5q8foj20z50jlwg7.jpg)

### 2. 查看原仓库的相关信息，比较

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36eudcb4rj20wz0nh0vg.jpg)

> **比较后得知**：本地 `fork`仓库的版本落后于原始仓库

下一步计划，准备开始同步！

## 二、 同步

### 1. 查看本地仓库设置的远端仓库，是否有连接上游原始远端仓库

如果未连接上游仓库，添加远程仓库的变量地址

```bash
$  git remote -v

origin  https://github.com/xiaoyueyue165/taro.git (fetch)
origin  https://github.com/xiaoyueyue165/taro.git (push)
```

- 添加上游仓库

```bash
$ git remote add upsteream https://github.com/NervJS/taro.git
```

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36fh3o0haj20zl0nrwhg.jpg)

- 再次查看远程仓库指向地址列表，确认添加

```bash
$  git remote -v
origin  https://github.com/xiaoyueyue165/taro.git (fetch)
origin  https://github.com/xiaoyueyue165/taro.git (push)
upsteream  https://github.com/NervJS/taro.git (fetch)
upsteream  https://github.com/NervJS/taro.git (push)
```

### 2. fetch，取回原仓库的更新

```bash
$ git fetch upsteream
```

> 默认情况下，git fetch 取回所有分支（branch）的更新

### 3. 将 fetch 后的更新内容合并至主分支

所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。比如`upsteream`主机的`master`，就要用 `upsteream/master` 读取。

```bash
$ git merge upsteream/master
```

此时会发现本地 master 分支的 `commit` 日志已经与原仓库的日志保持一致

- 本地 master

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36fdmme4wj21a50h4760.jpg)

- 原始仓库

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36fit9vzhj20xd0nttbz.jpg)

### 4.更新，推送至远端 master 分支

```bash
$ git push origin master
```

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36fm0iv0bj20l806j0t6.jpg)

- 自己 fork 的 仓库变化， `commit` 数量与 最新日志与原仓库一致

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36ftr5z0oj20wo0ns41n.jpg)

![](http://ww1.sinaimg.cn/large/df551ea5ly1g36fvs95elj20w50nmwhn.jpg)

### 5. 同步远程的 tag

```bash

# 添加主仓库到 remote
git remote add upstream git@github.com:vant-ui/vant.git

# 拉取主仓库最新代码
git fetch upstream

# 切换至 main 分支
git checkout main

# 合并主仓库代码
git merge upstream/main

# 发布到自己 fork 的项目，origin 是自己的源地址

git push origin main
```

同步 tag

```bash
# 同步分支后查看合并后分支的 tag 版本情况，会看到很多 upstream 源才有的 tag
git tag

# 上一步如果不对再获取一下（可省略）
git fetch upstream --tag

# 把 tag 同步到自己的源
git push origin --tags
```

## 参考

- [Git 远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html) ， by 阮一峰
- [Syncing Your GitHub Fork](https://www.youtube.com/watch?v=-zvHQXnBO6c) , by [Data School](https://www.youtube.com/channel/UCnVzApLJE2ljPZSeQylSEyg)
- [Github 进行 fork 后如何与原仓库同步](https://github.com/selfteaching/the-craft-of-selfteaching/issues/67)
- [初学者的开源项目参与指南](https://www.freecodecamp.org/chinese/news/a-practical-guide-to-start-opensource-contributions/)
