`git merge`命令会生成一个新的合并 commit。如果你有强迫症，不喜欢这个新的合并 commit，git 也有更加清爽的方案可以满足你，它就是`git rebase`命令。

git 就是哆啦 A 梦的口袋。

`rebase`翻译过来是`变基`。意思就是将所有要合并进来的 commit 在新的基础上重新提交一次。

## 基础用法

`git rebase <branch>`会计算当前分支和目标分支的最近共同祖先，然后将最近共同祖先与当前分支之间的所有 commit 都变基到目标分支上，使得提交历史变成一条直线。

```
C0 -- C1 -- C2 -- C3(master)
       \
        C4 -- C5 -- C6(HEAD -> dev)
```

`merge`与`rebase`后跟的分支名是不一样的。合并是合并进来，变基是变基过去，你们感受一下。

```
$ git rebase master

First, rewinding head to replay your work on top of it...
Applying: C4.md
Applying: C5.md
Applying: C6.md
```

```
C0 -- C1 -- C2 -- C3(master) -- C4' -- C5' -- C6'(HEAD -> dev)
       \
        C4 -- C5 -- C6
```

现在最近共同祖先与当前分支之间的所有 commit 都被复制到 master 分支之后，并且将 HEAD 指针与当前分支指针切换过去。这招移花接木玩的很溜啊，如果你置身其中根本分不出区别。

原来的 commit 还在吗？还在，如果你记得它的 commit 校验和，仍然可以切换过去，git 会提示你当前处于`detached HEAD`状态下。只不过没有任何分支指针指向它们，它们已经被抛弃了，剩余的时光就是等待 git 垃圾回收命令清理它们。

好在，还有人记得它们，不是么？

`git rebase`完并没有结束，因为我变基的目标分支是 master，而当前分支是 dev。我需要切换到 master 分支上，然后再合并一次。

```
$ git checkout master
```

```
$ git merge dev
```

诶，说来说去，还是要合并啊？

别急，这种合并是`Fast forward`的，并不会生成一个新的合并 commit。

如果我要变基的本体分支不是当前分支行不行？也是可以的。

```
$ git rebase master dev
```

你在任何一个分支上，这种写法都可以将 dev 分支变基到 master 分支上，变基完成当前分支会变成 dev 分支。

## 裁剪 commit 变基

变基有点像基因编辑，git 有更精确的工具达到你想要的效果。

> 有了精确的基因编辑技术，妈妈再也不用担心你长的**丑**啦。

```
C0 -- C1 -- C2 -- C3(master)
       \
        C4 -- C5 -- C6(dev)
         \
          C7 -- C8(HEAD -> hotfix)
```

```
$ git rebase --onto master dev hotfix

First, rewinding head to replay your work on top of it...
Applying: C7.md
Applying: C8.md
```

```
C0 -- C1 -- C2 -- C3(master) -- C7' -- C8'(HEAD -> hotfix)
       \
        C4 -- C5 -- C6(dev)
         \
          C7 -- C8
```

`--onto`参数就是那把基因编辑的剪刀。

它会把`hotfix分支`到`hotfix分支与dev分支的最近共同祖先`之间的 commit 裁剪下来，复制到目标基础点上。注意，所谓的之间指的都是不包括`最近共同祖先commit`的范围，比如这里就不会复制`C4`commit。

```
$ git rebase --onto master dev

First, rewinding head to replay your work on top of it...
Applying: C7.md
Applying: C8.md
```

如果`--onto`后面只写两个分支(或者 commit)名，第三个分支(或者 commit)默认就是 HEAD 指针指向的分支(或者 commit)。

## 变基冲突解决

变基也会存在冲突的情况，我们看看冲突怎么解决。

```
C0 -- C1 -- C2(HEAD -> master)
       \
        C3 -- C4(dev)
```

```
$ git rebase master dev

First, rewinding head to replay your work on top of it...
Applying: c.md
Applying: a.md add banana
Using index info to reconstruct a base tree...
M	a.md
Falling back to patching base and 3-way merge...
Auto-merging a.md
CONFLICT (content): Merge conflict in a.md
error: Failed to merge in the changes.
Patch failed at 0002 a.md dev
The copy of the patch that failed is found in: .git/rebase-apply/patch
Resolve all conflicts manually, mark them as resolved with
"git add/rm <conflicted_files>", then run "git rebase --continue".
You can instead skip this commit: run "git rebase --skip".
To abort and get back to the state before "git rebase", run "git rebase --abort".
```

C2 和 C4 同时修改了`a.md`的某一行，引发冲突。git 已经给我们提示了，大体上和`merge`的操作一致。

我们可以手动解决冲突，然后执行`git add`和`git rebase --continue`来完成变基。

如果你不想覆盖目标 commit 的内容，也可以跳过这个 commit，执行`git rebase --skip`。但是注意，这会跳过有冲突的整个 commit，而不仅仅是有冲突的部分。

后悔药也是有的，执行`git rebase --abort`，干脆就放弃变基了。

## cherry-pick

`git rebase --onto`命令可以裁剪分支以变基到另一个分支上。但它依然是挑选连续的一段 commit，只是允许你指定头和尾罢了。

别急，`git cherry-pick`命令虽然是一个独立的 git 命令，它的效果却还是变基，而且是 commit 级别的变基。

`git cherry-pick`命令可以挑选任意 commit 变基到目标 commit 上。你负责挑，它负责基。

#### 用法

只需要在`git cherry-pick`命令后跟 commit 校验和，就可以将它应用到目标 commit 上。

```
C0 -- C1 -- C2(HEAD -> master)
       \
        C3 -- C4 -- C5(dev)
               \
                C6 -- C7(hotfix)
```

将当前分支切换到 master 分支。

```
$ git cherry-pick C6

[master dc342e0] c6
 Date: Mon Dec 24 09:13:57 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 c6.md
```

```
C0 -- C1 -- C2 -- C6'(HEAD -> master)
       \
        C3 -- C4 -- C5(dev)
               \
                C6 -- C7(hotfix)
```

`C6`commit 就按原样重新提交到 master 分支上了。`cherry-pick`并不会修改原有的 commit。

同时挑选多个 commit 也很方便，往后面叠加就行。

```
$ git cherry-pick C4 C7

[master ab1e7c7] c4
 Date: Mon Dec 24 09:12:58 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 c4.md
[master 161d993] c7
 Date: Mon Dec 24 09:14:12 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 c7.md
```

```
C0 -- C1 -- C2 -- C4' -- C7'(HEAD -> master)
       \
        C3 -- C4 -- C5(dev)
               \
                C6 -- C7(hotfix)
```

如果这多个 commit 正好是连续的呢？

```
$ git cherry-pick C3...C7

[master d16c42e] c4
 Date: Mon Dec 24 09:12:58 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 c4.md
[master d16c42e] c6
 Date: Mon Dec 24 09:13:57 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 c6.md
[master a4d5976] c7
 Date: Mon Dec 24 09:14:12 2018 +0800
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 c7.md
```

```
C0 -- C1 -- C2 -- C4' -- C6' -- C7'(HEAD -> master)
       \
        C3 -- C4 -- C5(dev)
               \
                C6 -- C7(hotfix)
```

需要注意，git 所谓的从某某开始，一般都是不包括某某的，这里也一样。

有没有发现操作连续 commit 的`git cherry-pick`和`git rebase`的功能已经非常接近了？所以呀，`git cherry-pick`也是变基，只不过一边变基一边喂樱桃给你吃。

#### 冲突

git 各种命令解决冲突的方法都大同小异。

```
C0 -- C1(HEAD -> master)
 \
  C2(dev)
```

```
$ git cherry-pick C2

error: could not apply 051c24c... banana
hint: after resolving the conflicts, mark the corrected paths
hint: with 'git add <paths>' or 'git rm <paths>'
hint: and commit the result with 'git commit'
```

手动解决冲突，执行`git add`命令然后执行`git cherry-pick --continue`命令。

如果被唬住了想还原，执行`git cherry-pick --abort`即可。

## 变基还是合并

这是一个哲学问题。

有一种观点认为，仓库的 commit 历史应该记录`实际发生过什么`。所以如果你将一个分支合并进另一个分支，commit 历史中就应该有这一次合并的痕迹，因为它是实实在在发生过的。

另一种观点则认为，仓库的 commit 历史应该记录`项目过程中发生过什么`。合并不是项目开发本身带来的，它是一种额外的操作，会使 commit 历史变的冗长。

我是一个极简主义者，所以我支持首选变基。
