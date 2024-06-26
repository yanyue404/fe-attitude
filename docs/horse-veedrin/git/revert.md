有时候我们想撤回一个 commit，但是这个 commit 已经在公共的分支上。如果直接修改分支历史，可能会引起一些不必要的混乱。这个时候，`git revert`命令就派上用场了。

`revert`翻译成中文是`还原`。我觉得称它为对冲更合理。对冲指的是同时进行两笔行情相关、方向相反、数量相当、盈亏相抵的交易，这么理解`git revert`命令一针见血。

因为它的作用就是生成一个新的、完全相反的 commit。

## 命令

`git revert`后跟你想要对冲的 commit 即可。

```
$ git revert HEAD

Revert "add c.md"
This reverts commit 8a23dad059b60ba847a621b6058fb32fa531b20a.
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Changes to be committed:
#	deleted:    c.md
```

git 会弹出默认或者自定义的编辑器要求你输入 commit 信息。然后一个新的 commit 就生成了。

```
[master a8c4205] Revert "add c.md"
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 c.md
```

可以看到，原本我添加了一个文件`a.md`，`revert`操作就会执行删除命令。在工作目录看起来就像添加文件操作被撤销了一样，其实是被对冲了。

它不会改变 commit 历史，只会增加一个新的对冲 commit。这是它最大的优点。

## 冲突

反向操作也会有冲突？你逗我的吧。

如果你操作的是最新的 commit，那当然不会有冲突了。

那要操作的是以前的 commit 呢？

```
C0 -- C1 -- C2(HEAD -> master)
```

比如`a.md`在`C0`内容为空，`C1`修改文件内容为`apple`，`C2`修改文件内容为`banana`。这时候你想撤销`C1`的修改。

```
$ git revert HEAD~

error: could not revert 483b537... apple
hint: after resolving the conflicts, mark the corrected paths
hint: with 'git add <paths>' or 'git rm <paths>'
hint: and commit the result with 'git commit'
```

我们看一下文件内容。

```
<<<<<<< HEAD
banana
=======
>>>>>>> parent of 483b537... apple
```

手动解决冲突，执行`git add`命令然后执行`git revert --continue`命令完成对冲操作。

取消`revert`操作只需要执行`git revert --abort`即可。
