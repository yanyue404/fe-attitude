## 前言

在日常工作我中使用 vscode 作为开发编辑器，本地使用编辑器自带的 git 解决方案，安装了 [TortoiseGit](https://tortoisegit.org/) 来简化 git 操作，但是必要的命令行操作还是必须的。

为了提高操作的效率以及优化使用体验，我还做了 `.gitconfig` 自定义配置，安装了命令行工具 [git bash](https://gitforwindows.org/)、[Conemu](https://conemu.github.io/) 。

在这里记录一下我常用的 Git 命令清单，方便查阅。

## 命令清单

（1）初始化

```shell
# 配置用户名
git config --global user.name "自己的名字"

# 配置邮箱
git config --global user.email "自己的邮箱"

# 生成设备公钥
ssh-keygen -t rsa || ssh-keygen

# 测试 github 连接状态
ssh -T git@github.com

# 拷贝项目与历史记录
git clone [url]
```

（2） 配置

```shell
# 显示当前的Git配置
git config --list

# 编辑Git配置文件
git config -e [--global]
```

（3） 查看信息

```shell
# 查看提交日志,图形化显示合并关系 (自定义简化命令)
git lgh

# 显示整个本地仓库的最近提交，包括所有分支
git reflog

# 显示工作区有变更的文件
git status => git st

# 查看某次 commmit 的提交信息
git show [commitID]

# 显示某次提交时，某个文件的内容
git show [commitID]:[filename]

# 显示两次提交之间的差异
git diff [first-commitID] [second-commitID]
```

（4） 撤销

```shell
# 撤销工作区的修改 (指所有未暂存的文件)
git restore .

# 撤销暂存区的修改，将文件恢复到工作区
git restore --staged .

# 重置当前分支的HEAD为指定commitID，同时重置暂存区和工作区，与指定commit一致
git reset --hard [commitID]

# 取消 rebase
git rebase --abort

# 暂时将未提交的变化移除，方便做其他操作
git stash

# 移入之前缓存的工作区修改
git stash pop

# 查看缓存的 stash 列表
git stash list
```

（5） 分支

```shell
# 列出所有本地分支
git branch => git br

# 列出所有远程分支
git branch -r

# 列出所有本地分支和远程分支
git branch -a

# 切换到目标分支
git checkout [branch-name] => git co [branch-name]

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 新建一个分支(基于当前分支)，并切换到该分支
git checkout -b [branch]

# 新建一个分支(基于develop分支)，并切换到该分支
git checkout -b [new-branch] develop

# 新建本地分支后关联远程分支
git push --set-upstream origin develop-yue

# 合并指定分支到当前分支
git merge [branch]

# 不使用fast-forward 方式合并，保留分支的commit历史
git merge --no-ff [branch]

# 合并分支，并提交 commit 描述
git merge --no-ff -m "feat: 新特性" [branch]

# 选择一个或多个commit，合并进当前分支
git cherry-pick [commit1_ID] [commit2_ID]

# 删除分支
git branch -d [branch-name]

# 更新本地远端分支目录
git remote update origin --prune

# 删除远程分支
git push origin --delete [branch-name]
```

（6） 代码提交

> `=>` 后为自定义的简化命令

```shell
# 添加指定文件到暂存区
git add [file1] [file2] ...

# 添加当前目录的所有文件到暂存区
git add .

# 提交 log 注释
git commit -m "commit log"

# 变基拉取远端最新代码（本地没有修改）
git pull --rebase => git pr

# 变基拉取远端最新代码（本地有修改）
git pull --rebase --autostash => git prs

# 推送到远端
git push

# 覆盖重写最新 commit（而后强制提交）
git commit --amend -m "chore: "

# 修改提交日志
git rebase -i HEAD~5
```

（7）标签

```shell
# 列出所有tag
git tag

# 新建一个tag在当前commit
git tag [tag]

# 新建一个tag在指定commit
git tag [tag] [commit]

# 设置带有说明的标签 ，-a 为标签， -m 为说明
git tag -a [tag] -m "commit log" [commit]

# 查看tag信息
git show [tag]

# 切换到 tag
git checkout v1.0.0

# 提交指定tag
git push [remote] [tag]

# 删除本地 tag
git tag -d [tag]

# 删除远程tag
git push origin :refs/tags/[tagName]
```

（8）导出

```shell
# 将master分支打包为output.tar.gz
git archive --format tar.gz --output "./output.tar.gz" master
```

（9） git 创建一个空分支

```bash
# 1. 创建分支
git checkout --orphan new-branchName

#2. 删除所有内容我们不想提交任何内容，所以我们需要把当前内容全部删除

git rm -rf .

#3. 提交分支使用 commit 命令来提交分支

git commit -am "new branch for documentation"

#如果没有任何文件提交的话，分支是看不到的，可以创建一个新文件后再次提交则新创建的 branch 就会显示出来。

#4. 使用 branch 来查看分支是否创建成功

git branch -a
```

## 自定义配置

```shell
[user]
	name = yanyue404
	email = xiaoyueyue165@gmail.com
	signingkey = ""
[credential]
	helper = store
[http]
	postBuffer = 500M
	sslBackend = openssl
	maxRequestBuffer = 100M
[color]
	diff = auto
	status = auto
	branch = auto
	ui = true
[alias]
# 简化命令
	br = branch
	ci = commit
	co = checkout
	st = status
	mg = merge
	cp = cherry-pick
	last = log -10
# 回退
	rs = reset --hard
	back = checkout master
	r3 = rebase -i HEAD~3
	r5 = rebase -i HEAD~5
	r7 = rebase -i HEAD~7
	r10 = rebase -i HEAD~10
	unstage = reset HEAD
	rh = reset --hard HEAD
# pull
	pr = pull --rebase
	prs = pull --rebase --autostash
# 日志
	lg  = log --color --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset'  --date=format:'%Y-%m-%d %H:%M:%S' --abbrev-commit
	lgd = log --color --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --date=format:'%Y-%m-%d %H:%M:%S' --abbrev-commit
	lgh = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	lgr = log --color --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --reverse
[format]
	pretty = %C(yellow)%h%Creset %s %C(red)(%an, %cr)%Creset
[help]
	autocorrect = 1
[core]
	compression = 0
	quotepath = true
[i18n]
	commitencoding = utf-8
	logoutputencoding = utf-8
[gui]
	encoding = utf-8
[merge "ours"]
	driver = true

```

## 参考

- [常用 Git 命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- [stackoverflow 关于 Git 的高票回答](https://stackoverflow.com/questions/tagged/git?tab=Votes)
- [git merge --no-ff 是什么意思](https://segmentfault.com/q/1010000002477106)

The text was updated successfully, but these errors were encountered:
