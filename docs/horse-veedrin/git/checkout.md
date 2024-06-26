在 git 中，暂存区里有若干备份，版本库里有若干版本。留着这些东西肯定是拿来用的对吧，怎么用呢？当我需要哪一份的时候我就切换到哪一份。

`git checkout`命令就是用来干这个的，官方术语叫做`签出`。

怎么理解`checkout`这个词呢？`checkout`原本指的是消费结束服务员要与你核对一下账单，结完账之后你就可以走了。在 git 中核对指的是 diff，比较两份版本的差异，如果发现没有冲突那就可以切换过来了。

## 底层

我们知道 HEAD 指针指向当前版本，而`git checkout`命令的作用是切换版本，它们肯定有所关联。

目前 HEAD 指针指向 master 分支。

```
$ cat .git/HEAD

ref: refs/heads/master
```

如果我切换到另一个分支，会发生什么？

```
$ git checkout dev

Switched to branch 'dev'
```

```
$ cat .git/HEAD

ref: refs/heads/dev
```

果然，`git checkout`命令的原理就是改变了 HEAD 指针。而一旦 HEAD 指针改变，git 就会取出 HEAD 指针指向的版本作为当前工作目录的版本。签出到一个没有分支引用的 commit 也是一样的。

## 符号

在进入正题之前，我们要先聊聊 git 中的两个符号`~`和`^`。

如果我们要从一个分支切换到另一个分支，那还好说，足够语义化。但是如果我们要切换到某个 commit，除了兢兢业业的找到它的 SHA-1 值，还有什么办法快速的引用到它呢？

比如说我们可以根据 commit 之间的谱系关系快速定位。

```
$ git log --graph --oneline

* 4e76510 (HEAD -> master) c4
*   2ec8374 c3
|\
| * 7c0a8e3 c2
* | fb60f51 c1
|/
* dc96a29 c0
```

> `~`的作用是在纵向上定位。它可以一直追溯到最早的祖先 commit。如果 commit 历史有分叉，那它就选第一个，也就是主干上的那个。
>
> `^`的作用是在横向上定位。它无法向上追溯，但是如果 commit 历史有分叉，它能定位所有分叉中的任意一支。

#### HEAD 不加任何符号、加`~0` 符号或者加`^0`符号时，定位的都是当前版本

这个不用说，定位当前 commit。

```
$ git rev-parse HEAD

4e76510fe8bb3c69de12068ab354ef37bba6da9d
```

它表示定位第零代父 commit，也就是当前 commit。

```
$ git rev-parse HEAD~0

4e76510fe8bb3c69de12068ab354ef37bba6da9d
```

它表示定位当前 commit 的第零个父 commit，也就是当前 commit。

```
$ git rev-parse HEAD^0

4e76510fe8bb3c69de12068ab354ef37bba6da9d
```

#### 用`~`符号数量的堆砌或者`~数量`的写法定位第几代父 commit

```
$ git rev-parse HEAD~~

fb60f519a59e9ceeef039f7efd2a8439aa7efd4b
```

```
$ git rev-parse HEAD~2

fb60f519a59e9ceeef039f7efd2a8439aa7efd4b
```

#### 用`^数量`的写法定位第几个父 commit

注意，`^`定位的是当前基础的父 commit。

```
$ git rev-parse HEAD^

2ec837440051af433677f786e502d1f6cdeb0a4a
```

```
$ git rev-parse HEAD^1

2ec837440051af433677f786e502d1f6cdeb0a4a
```

因为当前 commit 只有一个父 commit，所以定位第二个父 commit 会失败。

```
$ git rev-parse HEAD^2

HEAD^2
fatal: ambiguous argument 'HEAD^2': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

#### 用`~数量^数量`的写法或者`^数量^数量`的写法定位第几代父 commit 的第几个父 commit

当前 commit 的第一代父 commit 的第零个父 commit，意思就是第一代父 commit 咯。

```
$ git rev-parse HEAD~^0

2ec837440051af433677f786e502d1f6cdeb0a4a
```

比如这里定位的是当前 commit 的第一代父 commit 的第一个父 commit。再次注意，`^`定位的是当前基础的父 commit。

```
$ git rev-parse HEAD~^1

fb60f519a59e9ceeef039f7efd2a8439aa7efd4b
```

这里定位的是当前 commit 的第一代父 commit 的第二个父 commit。

```
$ git rev-parse HEAD~^2

7c0a8e3a325ce1b5a1cdeb8c89bef1ecf17c10c9
```

同样，定位到一个不存在的 commit 会失败。

```
$ git rev-parse HEAD~^3

HEAD~^3
fatal: ambiguous argument 'HEAD~^3': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

和`~`不同，`^2`和`^^`的效果是不一样的。`^2`指的是第二个父 commit，`^^`指的是第一个父 commit 的第一个父 commit。

## 切换到 HEAD

`git checkout`命令如果不带任何参数，默认会加上 HEAD 参数。而 HEAD 指针指向的就是当前 commit。所以它并不会有任何签出动作。

前面没有提到的是，`git checkout`命令会有一个顺带效果：比较签出后的版本和暂存区之间的差异。

所以`git checkout`命令不带任何参数，意思就是比较当前 commit 和暂存区之间的差异。

```
$ git checkout

A	b.md
```

```
$ git checkout HEAD

A	b.md
```

## 切换到 commit

开发者用的最多的当然是切换分支。其实`checkout`后面不仅可以跟分支名，也可以跟 commit 的校验和，还可以用符号定位 commit。

```
$ git checkout dev

Switched to branch 'dev'
```

```
$ git checkout acb71fe

Note: checking out 'acb71fe11f78d230b860692ea6648906153f3d27'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:
  git checkout -b <new-branch-name>
HEAD is now at acb71fe... null
```

```
$ git checkout HEAD~2

Note: checking out 'acb71fe11f78d230b860692ea6648906153f3d27'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:
  git checkout -b <new-branch-name>
HEAD is now at acb71fe... null
```

## 创建分支并切换

有时候我们在创建分支时希望同时切换到创建后的分支，仅仅`git branch <branch>`是做不到的。这时`git checkout`命令可以提供一个快捷操作，创建分支和切换分支一步到位。

```
$ git checkout -b dev

Switched to a new branch 'dev'
```

## 暂存区文件覆盖工作区文件

`git checkout`不仅可以执行切换 commit 这种全量切换，它还能以文件为单位执行微观切换。

```
$ git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
```

```
$ git checkout -- a.md
```

```
$ git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   a.md
```

因为暂存区覆盖了工作区，所以工作区的改动就被撤销了，现在只剩下暂存区的改动等待提交。其实相当于撤销文件在工作区的改动，只不过它的语义是覆盖。这个命令没有任何提示，直接撤销工作区改动，要谨慎使用。

我们看到 git 提示语中有一个`git checkout -- <file>`命令，这又是干嘛用的呢？

提醒一下，这个参数的写法不是`git checkout --<file>`，而是`git checkout -- <file>`。

其实它和`git checkout <file>`的效果是一样的。但是别急，我是说这两个命令**想要**达到的效果是一样的，但**实际**效果却有略微的差别。

独立的`--`参数在 Linux 命令行中指的是：视后面的参数为文件名。当后面跟的是文件名的时候，最好加上独立的`--`参数，以免有歧义。

也就是说，如果该项目正好有一个分支名为`a.md`(皮一下也不是不行对吧)，那加独立的`--`参数就不会操作分支，而是操作文件。

如果你觉得仅仅撤销一个文件在工作区的改动不过瘾，你不是针对谁，你是觉得工作区的改动都是垃圾。那么还有一个更危险的命令。

```
$ git checkout -- .
```

`.`代表当前目录下的所有文件和子目录。这条命令会撤销所有工作区的改动。

## 当前 commit 文件覆盖暂存区文件和工作区文件

如果执行`git checkout -- <file>`的时候加上一个分支名或者 commit 的校验和，效果就是该文件的当前版本会同时覆盖暂存区和工作区。相当于同时撤销文件在暂存区和工作区的改动。

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
$ git checkout HEAD -- a.md
```

```
$ git status

On branch master
nothing to commit, working tree clean
```

最后再提醒一下，运行`git checkout`命令作用于文件时，即便覆盖内容与被覆盖内容有冲突，也会直接覆盖，所以这真的是闷声打雷式的 git 命令，一定要抽自己几个耳刮子方可放心食用。
