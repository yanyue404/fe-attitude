有四个 git 命令可以用来查看 git 仓库相关信息。

## status

`git status`命令的作用是同时展示工作区和暂存区的 diff、暂存区和当前版本的 diff、以及没有被 git 追踪的文件。

```
$ git status

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   b.md
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	c.md
```

这个命令应该是最常用的 git 命令之一了，每次提交之前都要看一下。

`git status -v`命令相当于`git status`命令和`git diff --staged`之和。

```
$ git status -v

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   b.md
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	c.md
diff --git a/a.md b/a.md
index 5646a65..4c479de 100644
--- a/a.md
+++ b/a.md
@@ -1 +1 @@
-apple
+banana
```

`git status -vv`命令相当于`git status`命令和`git diff`之和。

```
$ git status -vv

On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)
	modified:   a.md
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   b.md
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	c.md
Changes to be committed:
diff --git c/a.md i/a.md
index 5646a65..4c479de 100644
--- c/a.md
+++ i/a.md
@@ -1 +1 @@
-apple
+banana
--------------------------------------------------
Changes not staged for commit:
diff --git i/b.md w/b.md
index e69de29..637a09b 100644
--- i/b.md
+++ w/b.md
@@ -0,0 +1 @@
+## git is awesome
```

还有一个`-s`参数，给出的结果很有意思。

```
$ git status -s

M  a.md
 M b.md
?? c.md
```

注意看，前面的字母位置是不一样的。

第一个位置是该文件在暂存区的状态，第二个位置是该文件在工作区的状态。比如，以下信息显示`a.md`文件在暂存区有改动待提交，在工作区也有改动待暂存。

```
MM a.md
```

缩写的状态码主要有这么几种：

| 状态码 | 含义              |
| ------ | ----------------- |
| M      | 文件内容有改动    |
| A      | 文件被添加        |
| D      | 文件被删除        |
| R      | 文件被重命名      |
| C      | 文件被复制        |
| U      | 文件冲突未解决    |
| ?      | 文件未被 git 追踪 |
| !      | 文件被 git 忽略   |

> `?`和`!`所代表的状态因为没有进入 git 版本系统，所以任何时候两个位置都是一样的。就像`??`或者`!!`这样。

## show

`git show`命令`show`的是什么呢？git 对象。

```
$ git show

commit 2bd3c9d7de54cec10f0896db9af04c90a41a8160
Author: veedrin <veedrin@qq.com>
Date:   Fri Dec 28 11:23:27 2018 +0800
    update
diff --git a/README.md b/README.md
index e8ab145..75625ce 100644
--- a/README.md
+++ b/README.md
@@ -5,3 +5,5 @@ one
 two
 three
+
+four
```

`git show`相当于`git show HEAD`，显示当前 HEAD 指向的 commit 对象的信息。

当然，你也可以查看某个 git 对象的信息，后面跟上 git 对象的校验和就行。

```
$ git show 38728d8

tree 38728d8
README.md
```

## diff

`git diff`命令可以显示两个主体之间的差异。

#### 工作区与暂存区的差异

单纯的`git diff`命令显示工作区与暂存区之间的差异。

```
$ git diff

diff --git a/a.md b/a.md
index e69de29..5646a65 100644
--- a/a.md
+++ b/a.md
@@ -0,0 +1 @@
+## git is awesome
```

因为是两个主体之间的比较，git 永远将两个主体分别命名为`a`和`b`。

也可以只查看某个文件的 diff。当然这里依然是工作区与暂存区之间的差异。

```
$ git diff a.md
```

#### 暂存区与当前 commit 的差异

`git diff --staged`命令显示暂存区与当前 commit 的差异。

`git diff --cached`也可以达到相同的效果，它比较老，不如`--staged`语义化。

```
$ git diff --staged

diff --git a/b.md b/b.md
index e69de29..4c479de 100644
--- a/b.md
+++ b/b.md
@@ -0,0 +1 @@
+apple
```

同样，显示某个文件暂存区与当前 commit 的差异。

```
$ git diff --staged a.md
```

#### 两个 commit 之间的差异

我们还可以用`git diff`查看两个 commit 之间的差异。

```
$ git diff C1 C2

diff --git a/a.md b/a.md
index e69de29..5646a65 100644
--- a/a.md
+++ b/a.md
@@ -0,0 +1 @@
+## git is awesome
diff --git a/b.md b/b.md
new file mode 100644
index 0000000..e69de29
```

注意先后顺序很重要，假如我改一下顺序。

```
$ git diff C2 C1

diff --git a/a.md b/a.md
index 5646a65..e69de29 100644
--- a/a.md
+++ b/a.md
@@ -1 +0,0 @@
-## git is awesome
diff --git a/b.md b/b.md
deleted file mode 100644
index e69de29..0000000
```

比较两个 commit 之间某个文件的差异。

```
$ git diff C1:a.md C2:a.md

diff --git a/a.md b/a.md
index e69de29..5646a65 100644
--- a/a.md
+++ b/a.md
@@ -0,0 +1 @@
+## git is awesome
```

## log

`git log`命令显示提交历史。

```
$ git log

commit 7e2514419ec0f75d1557d3d8165a7e7969f08349
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:53 2018 +0800
    c.md
commit 4d346773212b208380f71885979f93da65f07ea6
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:41 2018 +0800
    b.md
commit cde34665b49033d7b8aed3a334c3e2db2200b4dd
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:54:59 2018 +0800
    a.md
```

如果要查看每个 commit 具体的改动，添加`-p`参数，它是`--patch`的缩写。

```
$ git log -p

commit 7e2514419ec0f75d1557d3d8165a7e7969f08349
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:53 2018 +0800
    c.md
diff --git a/c.md b/c.md
new file mode 100644
index 0000000..e69de29
commit 4d346773212b208380f71885979f93da65f07ea6
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:41 2018 +0800
    b.md
diff --git a/b.md b/b.md
new file mode 100644
index 0000000..e69de29
commit cde34665b49033d7b8aed3a334c3e2db2200b4dd
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:54:59 2018 +0800
    a.md
diff --git a/a.md b/a.md
new file mode 100644
index 0000000..e69de29
```

你还可以控制显示最近几条。

```
$ git log -p -1

commit 7e2514419ec0f75d1557d3d8165a7e7969f08349
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:53 2018 +0800
    c.md
diff --git a/c.md b/c.md
new file mode 100644
index 0000000..e69de29
```

`-p`有点过于冗余，只是想查看文件修改的统计信息的话，可以使用`--stat`参数。

```
$ git log --stat

commit 7e2514419ec0f75d1557d3d8165a7e7969f08349
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:53 2018 +0800
    c.md
 c.md | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
commit 4d346773212b208380f71885979f93da65f07ea6
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:56:41 2018 +0800
    b.md
 b.md | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
commit cde34665b49033d7b8aed3a334c3e2db2200b4dd
Author: veedrin <veedrin@qq.com>
Date:   Sat Dec 29 11:54:59 2018 +0800
    a.md
 a.md | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
```

还觉得冗余？只想看提交说明，有一个`--oneline`可以帮到你。

```
$ git log --oneline

4ad50f6 (HEAD -> master) 添加c.md文件
4d34677 添加b.md文件
cde3466 添加a.md文件
```

想在命令行工具看 git 提交历史的树形图表，用`--graph`参数。

```
$ git log --graph

* commit 7e2514419ec0f75d1557d3d8165a7e7969f08349 (HEAD -> master)
| Author: veedrin <veedrin@qq.com>
| Date:   Sat Dec 29 11:56:53 2018 +0800
|     c.md
* commit 4d346773212b208380f71885979f93da65f07ea6
| Author: veedrin <veedrin@qq.com>
| Date:   Sat Dec 29 11:56:41 2018 +0800
|     b.md
* commit cde34665b49033d7b8aed3a334c3e2db2200b4dd
  Author: veedrin <veedrin@qq.com>
  Date:   Sat Dec 29 11:54:59 2018 +0800
      a.md
```

我知道你们肯定又觉得冗余，`--graph`和`--oneline`食用更佳哟。

```
$ git log --graph --oneline

* 7e25144 (HEAD -> master) c.md
* 4d34677 b.md
* cde3466 a.md
```
