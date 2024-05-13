`git checkout`命令可以在版本之间随意切换，它的本质是移动 HEAD 指针。

那 git 有没有办法移动分支指针呢？

当然有，这就是`git reset`命令。

## 底层

`git reset`命令与`git checkout`命令的区别在于，它会把 HEAD 指针和分支指针一起移动，如果 HEAD 指针指向的是一个分支指针的话。

我们前面说过使用`git checkout`命令从有分支指向的 commit 切换到一个没有分支指向的 commit 上，这个时候的 HEAD 指针被称为`detached HEAD`。这是非常危险的。

```
C0 -- C1 -- C2(HEAD -> master)
```

```
$ git checkout C1
```

```
C0 -- C1(HEAD) -- C2(master)
```

但是`git reset`命令没有这个问题，因为它会把当前的分支指针也带过去。

```
C0 -- C1 -- C2(HEAD -> master)
```

```
$ git reset C1
```

```
C0 -- C1(HEAD -> master) -- C2
```

这就是`重置`的含义所在。它可以重置分支。

看另一种情况。如果是从一个没有分支指向的 commit 切换到另一个没有分支指向的 commit 上，那它们就是两个韩国妹子，傻傻分不清楚了。

这是`git checkout`命令的效果。

```
C0 -- C1 -- C2(HEAD) -- C3(master)
```

```
$ git checkout C1
```

```
C0 -- C1(HEAD) -- C2 -- C3(master)
```

这是`git reset`命令的效果。

```
C0 -- C1 -- C2(HEAD) -- C3(master)
```

```
$ git reset C1
```

```
C0 -- C1(HEAD) -- C2 -- C3(master)
```

## 同时重置暂存区和工作区的改动

当你在 `git reset` 命令后面加 `--hard` 参数时，暂存区和工作区的内容都会重置为重置后的 commit 内容。也就是说暂存区和工作区的改动都会清空，相当于撤销暂存区和工作区的改动。

而且是没有确认操作的哟。

```
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
```

```
$ git reset --hard HEAD^

HEAD is now at 58b0040 commit for nothing
```

```
$ git status

On branch master
nothing to commit, working tree clean
```

## 仅重置暂存区的改动

`git reset` 命令后面加 `--mixed` 参数，或者不加参数，因为`--mixed`参数是默认值，暂存区的内容会重置为重置后的 commit 内容，工作区的改动不会清空，相当于撤销暂存区的改动。

同样也是没有确认操作的哟。

```
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
```

```
$ git reset HEAD^

Unstaged changes after reset:
M	a.md
```

```
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
no changes added to commit (use "git add" and/or "git commit -a")
```

打个趣，如果`git reset`命令什么都不加会怎样呢？

你可以脑补一下，`git reset`命令不加参数默认就是`--mixed`，不加操作对象默认就是`HEAD`，所以单纯的`git reset`命令相当于`git reset --mixed HEAD`命令。

那这又意味着什么呢？

这意味着从当前 commit 重置到当前 commit，没有变化对吧？但是`--mixed`参数会撤销暂存区的改动对不对，这就是它的效果。

## 同时保留暂存区和工作区的改动

如果 `git reset` 命令后面加 `--soft` 参数，钢铁直男的温柔，你懂的。仅仅是重置 commit 而已，暂存区和工作区的改动都会保留下来。

更温柔的是，重置前的 commit 内容与重置后的 commit 内容的 diff 也会放入暂存区。

```
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
```

```
$ git diff --staged

diff --git a/a.md b/a.md
index 4a77268..fde8dcd 100644
--- a/a.md
+++ b/a.md
@@ -1,2 +1,3 @@
 apple
 banana
+cherry
```

```
$ git reset --soft HEAD^
```

```
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
```

```
$ git diff --staged

diff --git a/a.md b/a.md
index 4a77268..fde8dcd 100644
--- a/a.md
+++ b/a.md
@@ -1 +1,3 @@
 apple
+banana
+cherry
```

`banana`就是重置前的 commit 内容与重置后的 commit 内容的 diff，可以看到，它已经在暂存区了。

## 文件暂存区内容撤回工作区

`git reset`命令后面也可以跟文件名，它的作用是将暂存区的内容重置为工作区的内容，是`git add -- <file>`的反向操作。

`git reset -- <file>`命令是`git reset HEAD --mixed -- <file>`的简写。在操作文件时，参数只有默认的`--mixed`一种。

它并不会撤销工作区原有的改动。

```
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
```

```
$ git reset -- a.md

Unstaged changes after reset:
M	a.md
```

```
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
no changes added to commit (use "git add" and/or "git commit -a")
```

`git checkout`命令后面也可以跟文件名，它的作用是撤销工作区的改动，需要注意区分。

## 文件若干 commit 版本撤回工作区

如果`git reset`命令后跟一个 commit 校验和，它会把该 commit 与所有后代 commit 的 diff 重置到工作区。

意思就是将该文件重置回你指定的 commit 版本，但是在你指定的 commit 之后的改动我也给你留着，就放到工作区里吧。

```
$ git diff --staged

# 空
```

```
git reset HEAD~4 -- a.md

Unstaged changes after reset:
M	a.md
```

```
$ git diff --staged

diff --git a/a.md b/a.md
index 6f195b4..72943a1 100644
--- a/a.md
+++ b/a.md
@@ -1,5 +1 @@
 aaa
-bbb
-ccc
-ddd
-eee
```

`git diff --staged`命令比较工作区和暂存区的内容。可以看到初始工作区和暂存区是一致的，重置文件到 4 个版本之前，发现工作区比暂存区多了很多改动，这些都是指定 commit 之后的提交被重置到工作区了。
