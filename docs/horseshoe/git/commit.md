git 是一个版本管理系统。它的终极目的就是将项目特定时间的信息保留成一个版本，以便将来的回退和查阅。

我们已经介绍了暂存区，暂存区的下一步就是版本库，而促成这一步操作的是`git commit`命令。

## 提交

暂存区有待提交内容的情况下，如果直接运行`git commit`命令，git 会跳往默认编辑器要求你输入提交说明，你也可以自定义要跳往的编辑器。

```

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# On branch master
# Initial commit
# Changes to be committed:
#	new file:   a.md
```

提交之后我们就看到这样的信息。

```
[master (root-commit) 99558b4] commit for nothing
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 a.md
```

如果我就是不写提交说明呢？

```
Aborting commit due to empty commit message.
```

看到没有，提交信息在 git 中时必填的。

如果提交说明不多，可以加参数`-m`直接在命令后面填写提交说明。

```
$ git commit -m "commit for nothing"
```

你甚至可以将加入暂存区和提交一并做了。

```
$ git commit -am "commit for nothing"
```

但是要注意，和`git add -u`命令一样，未跟踪的文件是无法提交上去的。

## 重写提交

`amend`翻译成中文是`修改`的意思。`git commit --amend`命令允许你修改最近的一次 commit。

```
$ git log --oneline

8274473 (HEAD -> master) commit for nothing
```

目前项目提交历史中只有一个 commit。我突然想起来这次提交中有一个笔误，我把`高圆圆`写成了`高晓松`(真的是笔误)。但是呢，我又不想为了这个笔误增加一个 commit，毕竟它仅仅是一个小小的笔误而已。最重要的是我想悄无声息的改正它，以免被别人笑话。

这时我就可以使用`git commit --amend`命令。

首先修改`高晓松`成`高圆圆`。

然后执行`git add a.md`命令。

最后重写提交。git 会跳往默认或者自定义编辑器提示你修改 commit 说明。当然你也可以不改。

```
$ git commit --amend

commit for nothing
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
# Date:      Thu Jan 3 09:33:56 2019 +0800
# On branch master
# Initial commit
# Changes to be committed:
#	new file:   a.md
```

我们再来看提交历史。

```
$ git log --oneline

8a71ae1 (HEAD -> master) commit for nothing
```

提交历史中同样只有一个 commit。但是注意哟，commit 已经不是之前的那个 commit 了，它们的校验和是不一样的。这就是所谓的重写。

## tree 对象和 commit 对象

commit 操作涉及到两个 git 对象。

第一是 tree 对象。

它存储子目录和子文件的引用。如果只有 blob 对象，那版本库将是一团散沙。正因为有 tree 对象将它们的关系登记在册，才能构成一个有结构的版本库。

添加到暂存区操作并不会生成 tree 对象，这时项目的结构信息存储在`index`文件中，直到提交版本库操作，才会为每一个目录分别生成 tree 对象。

第二是 commit 对象。

它存储每个提交的信息，包括当前提交的根 tree 对象的引用，父 commit 对象的引用，作者和提交者，还有提交信息。所谓的版本，其实指的就是这个 commit 对象。

作者和提交者通常是一个人，但也存在不同人的情况。

## objects

初始化一个 git 项目，新建一些文件和目录。

```
src/
src/a.md
lib/
lib/b.md
```

首先运行`git add`命令。我们清楚，这会在`.git/objects`目录下生成一个 blob 对象，因为目前两个文件都是空文件，共享一个 blob 对象。

```
.git/objects/info/
.git/objects/pack/
.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391
```

现在我们运行`git commit`命令，看看有什么变化。

```
.git/objects/info/
.git/objects/pack/
.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391
.git/objects/93/810bbde0f994d41ef550324a2c1ad5f9278e19
.git/objects/52/0c9f9f61657ca1e65a288ea77d229a27a8171b
.git/objects/0b/785fa11cd93f95b1cab8b9cbab188edc7e04df
.git/objects/49/11ff67189d8d5cc2f94904fdd398fc16410d56
```

有意思。刚刚只有一个 blob 对象，怎么突然蹦出来这么多 git 对象呢？想一想之前说的`commit操作涉及到两个git对象`这句话，有没有可能多出来的几个，分别是 tree 对象和 commit 对象？

我们使用 git 底层命令`git cat-file -t <commit>`查看这些对象的类型发现，其中有一个 blob 对象，三个 tree 对象，一个 commit 对象。

这是第一个 tree 对象。

```
$ git cat-file -t 93810bb

tree
```

```
$ git cat-file -p 93810bb

100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	b.md
```

这是第二个 tree 对象。

```
$ git cat-file -t 520c9f9

tree
```

```
$ git cat-file -p 520c9f9

100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	a.md
```

这是第三个 tree 对象。

```
$ git cat-file -t 0b785fa

tree
```

```
$ git cat-file -p 0b785fa

040000 tree 93810bbde0f994d41ef550324a2c1ad5f9278e19	lib
040000 tree 520c9f9f61657ca1e65a288ea77d229a27a8171b	src
```

可以看到，提交时每个目录都会生成对应的 tree 对象。

然后我们再来看 commit 对象。

```
$ git cat-file -t 4911ff6

commit
```

```
$ git cat-file -p 4911ff6

tree 0b785fa11cd93f95b1cab8b9cbab188edc7e04df
parent c4731cfab38f036c04de93facf07cae496a124a2
author veedrin <veedrin@qq.com> 1546395770 +0800
committer veedrin <veedrin@qq.com> 1546395770 +0800
commit for nothing
```

可以看到，commit 会关联根目录的 tree 对象，因为关联它就可以关联到所有的项目结构信息，所谓擒贼先擒王嘛。它也要关联父 commit，也就是它的上一个 commit，这样才能组成版本历史。当然，如果是第一个 commit 那就没有父 commit 了。然后就是 commit 说明和一些参与者信息。

我们总结一下，`git add`命令会为加入暂存区的内容或文件生成 blob 对象，`git commit`命令会为加入版本库的内容或文件生成 tree 对象和 commit 对象。至此，四种 git 对象我们见识了三种。

为啥不在`git add`的时候就生成 tree 对象呢？

所谓暂存区，就是不一定会保存为版本的信息，只是一个准备的临时场所。git 认为在`git add`的时候生成 tree 对象是不够高效的，完全可以等版本定型时再生成。而版本定型之前的结构信息存在`index`文件中就好了。
