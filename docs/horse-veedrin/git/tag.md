git 是一个版本管理工具，但在众多版本中，肯定有一些版本是比较重要的，这时候我们希望给这些特定的版本打上标签。比如发布一年以后，程序的各项功能都趋于稳定，可以在圣诞节发布`v1.0`版本。这个`v1.0`在 git 中就可以通过标签实现。

而 git 标签又分为两种，轻量级标签和含附注标签。

轻量级标签和分支的表现形式是一样的，仅仅是一个指向 commit 的指针而已。只不过它不能切换，一旦贴上就无法再挪动了。

含附注标签才是我们理解的那种标签，它是一个独立的 git 对象。包含标签的名字，电子邮件地址和日期，以及标签说明。

## 创建

创建轻量级标签的命令很简单，运行`git tag <tag name>`。

```
$ git tag v0.3
```

在`.git`目录中就多了一个指针文件。

```
.git/refs/tags/v0.3
```

创建含附注标签要加一个参数`-a`，它是`--annotated`的缩写。

```
$ git tag -a v1.0
```

和`git commit`一样，如果不加`-m`参数，则会弹出默认或者自定义的编辑器，要求你写标签说明。

不写呢？

```
fatal: no tag message?
```

创建完含附注标签后，`.git`目录会多出两个文件。

```
.git/refs/tags/v0.3
```

```
.git/objects/80/e79e91ce192e22a9fd860182da6649c4614ba1
```

含附注标签不仅会创建一个指针，还会创建一个 tag 对象。

我们了解过 git 有四种对象类型，tag 类型是我们认识的最后一种。

我们看看该对象的类型。

```
$ git cat-file -t 80e79e9

tag
```

再来看看该对象的内容。

```
$ git cat-file -p 80e79e9

object 359fd95229532cd352aec43aada8e6cea68d87a9
type commit
tag v1.0
tagger veedrin <veedrin@qq.com> 1545878480 +0800
版本 v1.0
```

它关联的是一个 commit 对象，包含标签的名称，打标签的人，打标签的时间以及标签说明。

我可不可以给历史 commit 打标签呢？当然可以。

```
$ git tag -a v1.0 36ff0f5
```

只需在后面加上 commit 的校验和。

## 查看

查看当前 git 项目的标签列表，运行`git tag`命令不带任何参数即可。

```
$ git tag

v0.3
v1.0
```

注意 git 标签是按字母顺序排列的，而不是按时间顺序排列。

而且我并没有找到分别查看轻量级标签和含附注标签的方法。

查看标签详情可以使用`git show <tag name>`。

```
$ git show v0.3

commit 36ff0f58c8e6b6a441733e909dc95a6136a4f91b (tag: v0.3)
Author: veedrin <veedrin@qq.com>
Date:   Thu Dec 27 11:08:09 2018 +0800
    add a.md
diff --git a/a.md b/a.md
new file mode 100644
index 0000000..e69de29
```

```
$ git show v1.0

tag v1.0
Tagger: veedrin <veedrin@qq.com>
Date:   Thu Dec 27 11:08:39 2018 +0800
版本 v1.0
commit 6dfdb65ce65b782a6cb57566bcc1141923059d2b (HEAD -> master, tag: v1.0)
Author: veedrin <veedrin@qq.com>
Date:   Thu Dec 27 11:08:33 2018 +0800
    add b.md
diff --git a/b.md b/b.md
new file mode 100644
index 0000000..e69de29
```

## 删除

虽然 git 标签不能移动对吧，但我们可以删除它呀。

```
$ git tag -d v0.3

Deleted tag 'v0.3' (was 36ff0f5)
```

如果标签已经推送到了远端，也是可以删除的。

```
$ git push origin -d v0.3

To github.com:veedrin/git.git
 - [deleted]         v0.3
```

## 推送

默认情况下，`git push`推送到远端仓库并不会将标签也推送上去。如果想将标签推送到远端与别人共享，我们得显式的运行命令`git push origin <tag name>`。

```
$ git push origin v1.0

Counting objects: 1, done.
Writing objects: 100% (1/1), 160 bytes | 160.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0)
To github.com:veedrin/git.git
 * [new tag]         v1.0 -> v1.0
```

这里并不区分轻量级标签和含附注标签。

一次性将本地标签推送到远端仓库也是可以的。

```
$ git push origin --tags
```
