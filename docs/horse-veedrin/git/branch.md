分支是使得 git 如此灵活的强大武器，正是因为有巧妙的分支设计，众多的 git 工作流才成为可能。

现在我们已经知道 commit 对象其实就是 git 中的版本。那我们要在版本之间切换难道只能通过指定 commit 对象毫无意义的 SHA-1 值吗？

当然不是。

在 git 中，我们可以通过将一些指针指向 commit 对象来方便操作，这些指针便是分支。

> 分支在 git 中是一个模棱两可的概念。
>
> 你可以认为它仅仅是一个指针，指向一个 commit 对象节点。
>
> 你也可以认为它是指针指向的 commit 对象节点追溯到某个交叉节点之间的 commit 历史。

严格的来说，一种叫分支指针，一种叫分支历史。不过实际使用中，它们在名字上常常不作区分。

所以我们需要意会文字背后的意思，它究竟说的是分支指针还是分支历史。

大多数时候，它指的都是分支指针。

## master 分支

刚刚初始化的 git 仓库，会发现`.git/refs/heads`目录下面是空的。这是因为目前版本库里还没有任何 commit 对象，而分支一定是指向 commit 对象的。

一旦版本库里有了第一个 commit 对象，git 都会在`.git/refs/heads`目录下面自动生成一个`master`文件，它就是 git 的默认分支。不过它并不特殊，只是它充当的是一个默认角色而已。

刚刚初始化的 git 仓库会显示目前在 master 分支上，其实这个 master 分支是假的，`.git/refs/heads`目录下根本没有这个文件。只有等提交历史不为空时才有会真正的默认分支。

我们看一下`master`文件到底有什么。

```
$ cat .git/refs/heads/master

6b5a94158cc141286ac98f30bb189b8a83d61347
```

40 个字符，明显是某个 git 对象的引用。再识别一下它的类型，发现是一个 commit 对象。

```
$ git cat-file -t 6b5a941

commit
```

就这么简单，所谓的分支(分支指针)就是一个指向某个 commit 对象的指针。

## HEAD 指针

形象的讲，HEAD 就是景区地图上标注你当前在哪里的一个图标。

你当前在哪里，HEAD 就在哪里。它一般指向某个分支，因为一般我们都会在某个分支之上。

因为 HEAD 是用来标注当前位置的，所以一旦 HEAD 的位置被改变，工作目录就会切换到 HEAD 指向的分支。

```
$ git log --oneline

f53aaa7 (HEAD -> master) commit for nothing
```

但是也有例外，比如我直接签出到某个没有分支引用的 commit。

```
$ git log --oneline

cb64064 (HEAD -> master) commit for nothing again
324a3c0 commit for nothing
```

```
$ git checkout 324a3c0

Note: checking out '324a3c0'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:
  git checkout -b <new-branch-name>
HEAD is now at 324a3c0... commit for nothing
```

```
$ git log --oneline

324a3c0 commit for nothing
```

这个时候的 HEAD 就叫做`detached HEAD`。

要知道，只有在初始提交和某个分支之间的 commit 才是有效的。当你的 HEAD 处于`detached HEAD`状态时，在它之上新建的 commit 没有被任何分支包裹。一旦你切换到别的分支，这个 commit(可能)再也不会被引用到，最终会被垃圾回收机制删除。因此这是很危险的操作。

```
324a3c0 -- cb64064(master)
   \
 3899a24(HEAD)
```

如果不小心这么做了，要么在原地新建一个分支，要么将已有的分支强行移动过来。确保它不会被遗忘。

> 死亡不是终结，遗忘才是。——寻梦环游记

## 创建

除了默认的`master`分支，我们可以随意创建新的分支。

```
$ git branch dev
```

一个 dev 分支就创建好了。

## 查看

或许有时我们也想要查看本地仓库有多少个分支，因为在 git 中新建分支实在是太容易了。

```
$ git branch

  dev
* master
```

当前分支的前面会有一个`*`号标注。

同时查看本地分支和远端分支引用，添加`-a`参数。

```
$ git branch -a

* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/master
```

## 删除

一般分支合并完之后就不再需要了，这时就要将它删除。

```
$ git branch -d dev

Deleted branch dev (was 657142d).
```

有时候我们会得到不一样的提示。

```
$ git branch -d dev

error: The branch 'dev' is not fully merged.
If you are sure you want to delete it, run 'git branch -D dev'.
```

这是 git 的一种保护措施。`is not fully merged`是针对当前分支来说的，意思是你要删除的分支还有内容没有合并进**当前分支**，你确定要删除它吗？

大多数时候，当然是要的。

```
$ git branch -D dev

Deleted branch dev (was 657142d).
```

`-D`是`--delete --force`的缩写，你也可以写成`-df`。

需要注意的是，删除分支仅仅是删除一个指针而已，并不会删除对应的 commit 对象。不过有可能删除分支以后，这一串 commit 对象就无法再被引用了，从而被垃圾回收机制删除。
