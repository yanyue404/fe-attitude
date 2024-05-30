git 是分布式版本管理工具，它没有中央仓库。但多人协作时，我们依然需要一个集散地，让协作成员之间统一往集散地推送和拉取更新。否则，点对点的沟通，效率会很低。

所以就引出了 git 中远端仓库的概念。

## 概念

我们之前所有的操作都是在本地仓库完成的，和本地仓库对应的是远端仓库。那么本地有若干分支，远端仓库是不是也有对应的若干分支呢？

当然。

我们探讨一个问题，在离线状态下，git 是不是无从知道远端仓库的任何状态？

我让网络下线，查询从 github 克隆下来的本地仓库的状态，结果它告诉我本地仓库的 master 分支是`up to date with 'origin/master'`。

```
$ git status

On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

实际上，git 的分支有三种：

- 本地分支，我们可以通过`<branch>`写法访问它。
- 远端分支，我们可以通过`<remote branch>`写法访问它。
- 远端分支引用，我们可以通过`<remote/branch>`写法访问它。实际上它也是本地分支，只不过我们无法操作它，只有 git 的网络操作才可以更新它。离线状态下，git 给的状态就是本地分支和远端分支引用的比较结果。

> git 官方把我所说的`远端分支引用`称为`远端分支`。知道谁是谁就行了，名字不重要 🤔
>
> 我是马蹄疾

我们看一下本地的远端分支引用。

```
.git/
.git/refs/
.git/refs/remotes/
.git/refs/remotes/origin/
.git/refs/remotes/origin/HEAD
.git/refs/remotes/origin/master
```

默认的远端仓库名就叫`origin`。它也有 master 分支指针，也有 HEAD 指针。

## 拉取

如果远端仓库有新的提交或者新的分支，我们需要运行`git fetch`命令来拉取更新。

```
$ git fetch

remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (3/3), done.
From github.com:veedrin/git
   3893459..0f80eeb  master     -> origin/master
```

这个命令是`git fetch origin`的缩写。因为`origin`是远端仓库的默认名称，所以可以省略。如果有手动添加的远端仓库，那就必须指定远端仓库的名称了。

这个命令做了什么呢？

它会把新的提交和新的分支拉取到本地，然后更新本地的远端分支引用到最新的提交。

`git fetch`仅仅是将远端的更新拉取下来，同步本地的远端分支引用，不会对本地分支有任何影响。我们需要手动执行合并操作才能更新本地分支。

```
$ git merge origin/master

On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
```

当然，有一个更简单的操作。

```
$ git pull

remote: Enumerating objects: 5, done.
remote: Counting objects: 100% (5/5), done.
Unpacking objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
From github.com:veedrin/git
   4fbd1d4..d9785d7  master     -> origin/master
Updating 4fbd1d4..d9785d7
Fast-forward
 README.md | 2 ++
 1 file changed, 2 insertions(+)
```

`git pull`就是`git fetch`和`git merge`的一键操作。

## 推送

推送到远端的命令是`git push <remote-name> <remote-branch-name>`。

```
$ git push origin master

Counting objects: 3, done.
Writing objects: 100% (3/3), 261 bytes | 261.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:veedrin/git.git
   3eaa1ae..2bd3c9d  master -> master
```

如果当前分支对远端分支设置了追踪的话，也可以省略分支名。

```
$ git push

Counting objects: 3, done.
Writing objects: 100% (3/3), 261 bytes | 261.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:veedrin/git.git
   3eaa1ae..2bd3c9d  master -> master
```

有时候本地分支和远端分支同时有新的提交，直接`push`是不行的。

```
$ git push

To github.com:veedrin/git.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@github.com:veedrin/git.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

有两种方式解决。

第一是先把远端的更新拉下来，有冲突则解决冲突，没冲突则再推送。

第二是强推。有时候我们就是想覆盖远端对吧，也不是不行，但是必须十分谨慎。而且不要在公共分支上强制推送。

```
$ git push -f

Counting objects: 24, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (24/24), 3.72 KiB | 1.24 MiB/s, done.
Total 24 (delta 0), reused 3 (delta 0)
To github.com:veedrin/git.git
 + 54d741b...2db10e0 master -> master (forced update)
```

实际开发时我们会建很多特性分支，推送到远端，通过测试后再合入主分支。使用`git push <remote-name> <remote-branch-name>`每次都要指定远端分支名，如果会有多次推送，我们可以在推送时设置本地分支追踪远端分支，这样下次就可以直接推送了。

也可以简写成`git push -u <remote-name> <remote-branch-name>`。

```
$ git push --set-upstream origin dev

Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 255 bytes | 255.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
remote:
remote: Create a pull request for 'dev' on GitHub by visiting:
remote:      https://github.com/veedrin/git/pull/new/dev
remote:
To github.com:veedrin/git.git
 * [new branch]      dev -> dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
```

然后我们在`.git/config`文件中能看到多了一条配置。

```
[branch "dev"]
	remote = origin
	merge = refs/heads/dev
```

## 查看

查看远端仓库的命令是`git remote`。

```
$ git remote

origin
```

加`-v`参数可以查看更为详细的信息，`-v`是`--verbose`的缩写。

```
$ git remote -v

origin	git@github.com:veedrin/git.git (fetch)
origin	git@github.com:veedrin/git.git (push)
```

查看某个远端仓库的信息，可以使用命令`git remote show <remote-name>`。

```
$ git remote show origin

* remote origin
  Fetch URL: git@github.com:veedrin/git-1.git
  Push  URL: git@github.com:veedrin/git-1.git
  HEAD branch: master
  Remote branches:
    dev    tracked
    master tracked
  Local branches configured for 'git pull':
    dev    merges with remote dev
    master merges with remote master
  Local refs configured for 'git push':
    master pushes to master (up to date)
```

## 添加

添加新的远端仓库，使用`git remote add <shortname> <url>`命令。

```
$ git remote add horseshoe https://github.com/veedrin/horseshoe
```

然后本地就多了一个远端仓库。

```
$ git remote

horseshoe
origin
```

除了添加远端仓库，我们还可以添加本地分支对远端分支的追踪。

```
$ git checkout -b dev origin/dev

Branch 'dev' set up to track remote branch 'dev' from 'origin'.
Switched to a new branch 'dev'
```

创建 dev 分支的同时，也设置了对远端分支 dev 的追踪，这样下次推送的时候就不需要指定了。

当然，远端分支引用必须得存在才行。

```
$ git checkout -b dev origin/dev

fatal: 'origin/dev' is not a commit and a branch 'dev' cannot be created from it
```

git 也提供了快捷方式。

```
$ git checkout --track origin/dev

Branch 'dev' set up to track remote branch 'dev' from 'origin'.
Switched to a new branch 'dev'
```

## 重命名

有时候你想修改远端仓库的简写名。比如你将女朋友的名字命名为远端仓库的简写名，然后你们分手了。这真是一个令人悲伤(欣喜)的故事。

```
$ git remote rename nvpengyou gaoyuanyuan
```

查看远端仓库列表。

```
$ git remote

gaoyuanyuan
origin
```

## 删除

一般来说，一个 git 项目有一个远端仓库就行了，其余的大多是临时性的。所以总有一天要删除它。

```
$ git remote rm horseshoe
```

查看远端仓库列表。

```
$ git remote

origin
```
