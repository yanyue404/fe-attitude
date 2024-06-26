可以方便的创建分支是 git 如此受欢迎的重要原因，利用`git checkout <branch>`也让开发者在分支之间穿梭自如。然而百川终入海，其他分支上完成的工作终究是要合并到主分支上去的。

所以我们来看看 git 中的合并操作。

首先说明，执行`git merge`命令之前需要一些准备工作。

```
$ git merge dev

error: Your local changes to the following files would be overwritten by merge:
	a.md
Please commit your changes or stash them before you merge.
Aborting
```

合并操作之前必须保证暂存区内没有待提交内容，否则 git 会阻止合并。这是因为合并之后，git 会将合并后的版本覆盖暂存区。所以会有丢失工作成果的危险。

至于工作区有待添加到暂存区的内容，git 倒不会阻止你。可能 git 觉得它不重要吧。

不过最好还是保持一个干净的工作区再执行合并操作。

## 不同分支的合并

不同分支指的是要合并的两个 commit 在某个祖先 commit 之后开始分叉。

```
C0 -- C1 -- C2(HEAD -> master)
       \
        C3(dev)
```

`git merge`后跟合并客体，表示要将它合并进来。

```
$ git merge dev
```

进行到这里，如果没有冲突，git 会弹出默认或者自定义的编辑器，让你填写 commit 说明。当然它会给你填写一个默认的 commit 说明。

```
Merge branch 'dev'

# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
```

为什么要你填写 commit 说明？因为这种情况的`git merge`实际上会创建一个新的 commit 对象，记录此次合并的信息，并将当前分支指针移动到它上面来。

```
C0 -- C1 -- C2 -- C4(HEAD -> master)(merge commit)
       \          /
        \        /
          C3(dev)
```

大家常说不同分支的`git merge`操作是一个三方合并，这里的三方指的是`合并主体commit`、`合并客体commit`以及`合并主客体的共同祖先commit`。

所谓的三方和并到底是什么意思呢？

git 会提取出`合并主体commit`相对于`合并主客体的共同祖先commit`的 diff 与`合并客体commit`相对于`合并主客体的共同祖先commit`的 diff，再去比较这两份 diff 有没有修改同一个地方，这里同一个地方的单位是文件的行。如果没有，那就将这两份 diff 合并生成一个新的 commit，当前分支指针向右移。如果有那就要求开发者自行解决。

所以在三方合并中，`合并主客体的共同祖先commit`只是一个参照物。

## 合并主体在合并客体的上游

它指的是开发者当前在一个 commit 节点上，要将同一个分支上更新的 commit 节点合并进来。

```
C0 -- C1 -- C2(HEAD -> master) -- C3(dev)
```

这时候会发生什么呢？

这相当于更新当前分支指针，所以只需要将当前分支指针向下游移动，让合并主体与合并客体指向同一个 commit 即可。这时并不会产生一个新的 commit。

用三方合并的概念来理解，`合并主体commit`与`合并主客体的共同祖先commit`是同一个 commit，`合并主体commit`相对于`合并主客体的共同祖先commit`的 diff 为空，`合并客体commit`相对于`合并主客体的共同祖先commit`的 diff 与空 diff 合并还是它自己，所以移动过去就行了，并不需要生成一个新的 commit。

```
$ git merge dev

Updating 9242078..631ef3a
Fast-forward
 a.md | 2 ++
 1 file changed, 2 insertions(+)
```

```
C0 -- C1 -- C2 -- C3(HEAD -> master, dev)
```

这种操作在 git 中有一个专有名词，叫`Fast forward`。

比如说`git pull`的时候经常发生这种情况。通常因为远端有更新的 commit 我们才需要执行`git pull`命令，这时远端就是合并客体，本地就是合并主体，远端的分支指针在下游，也会触发`Fast forward`。

## 合并主体在合并客体的下游

如果合并主体在合并客体的下游，那合并主体本身就包含合并客体，合并操作并不会产生任何效果。

```
C0 -- C1 -- C2(dev) -- C3(HEAD -> master)
```

```
$ git merge dev

Already up to date.
```

```
C0 -- C1 -- C2(dev) -- C3(HEAD -> master)
```

依然用三方合并的概念来理解，这时`合并客体commit`与`合并主客体的共同祖先commit`是同一个 commit，`合并客体commit`相对于`合并主客体的共同祖先commit`的 diff 为空，`合并主体commit`相对于`合并主客体的共同祖先commit`的 diff 与空 diff 合并还是它自己。但是这回它都不用移动，因为合并后的 diff 就是它自己原有的 diff。

注意，这时候 dev 分支指针会不会动呢？

当然不会，`git merge`操作对合并客体是没有任何影响的。

## 同时合并多个客体

如果你在`git merge`后面跟不止一个分支，这意味着你想同时将它们合并进当前分支。

```
$ git merge aaa bbb ccc

Fast-forwarding to: aaa
Trying simple merge with bbb
Trying simple merge with ccc
Merge made by the 'octopus' strategy.
 aaa.md | 0
 bbb.md | 0
 ccc.md | 0
 3 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 aaa.md
 create mode 100644 bbb.md
 create mode 100644 ccc.md
```

git 合并有多种策略，上面使用的是`'octopus' strategy`章鱼策略，因为同时合并的多个分支最终都会指向新的 commit，看起来像章鱼的触手。

## 合并有冲突

`git merge`操作并不总是如此顺利的。因为有时候要合并的两个分支不是同一个人的，就会有很大的概率遇到两人同时修改文件某一行的情况。git 不知道该用谁的版本，它认为两个分支遇到了冲突。

这时就需要开发者手动的解决冲突，才能让 git 继续合并。

```
$ git merge dev

Auto-merging a.md
CONFLICT (content): Merge conflict in a.md
Automatic merge failed; fix conflicts and then commit the result.
```

我们来看一下有冲突的文件是什么样的。

```
<<<<<<< HEAD
apple
=======
banana
>>>>>>> dev
```

运行`git status`命令。

```
$ git status

On branch master
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)
Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   a.md
no changes added to commit (use "git add" and/or "git commit -a")
```

解决完冲突之后，你需要再提交，告诉 git 可以完成合并了。

```
$ git commit -m "fix merge conflict"

U	a.md
error: Committing is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```

诶，被拒绝了。是不是想起了自己的情场故事？

当我们解决冲突的时候，工作区已经有改动，所以需要先提交到暂存区。

```
$ git add a.md
```

```
$ git commit -m "fix merge conflict"

[master 9b32d4d] fix merge conflict
```

运行`git add`命令之后你也可以用`git merge --continue`来替代`git commit`命令。它会让后面的行为跟没有冲突时的行为表现的一样。

如果你遇到冲突以后不知道如何解决，因为你要去询问你的合作伙伴为什么这样改。这时你肯定想回到合并以前的状态。

这对 git 来说很容易。只需要运行`git merge --abort`命令即可。

```
$ git merge --abort
```

该命令无法保证恢复工作区的修改，所以最好是在合并之前先让工作区保持干净。
