程序遇到 bug 的时候，我们需要快速定位。

定位有两种，第一种是定位 bug 在哪个提交上，第二种是定位特定文件的某一行是谁最近提交的。

## bisect

有时候我们发现程序有 bug，但是回退几个版本都不解决问题。说明这个 bug 是一次很老的提交导致的，也不知道当时怎么就没察觉。

那怎么办呢？继续一个一个版本的回退？

估计`Linus Torvalds`会鄙视你吧。

为了专注于工作，不分心来鄙视你，`Linus Torvalds`在 git 中内置了一套定位 bug 的命令。

大家都玩过猜数字游戏吧。主持人悄悄写下一个数，给大家一个数字区间，然后大家轮流开始切割，谁切到主持人写的那个数就要自罚三杯了。

对，这就是二分法。git 利用二分法定位 bug 的命令是`git bisect`。

#### 使用

假设目前的 git 项目历史是这样的。

```
C0 -- C1 -- C2 -- C3 -- C4 -- C5 -- C6 -- C7 -- C8 -- C9(HEAD -> master)
```

这里面有一次 commit 藏了一个 bug，但幸运的是，你不知道是哪一次。

运行`git bisect start`命令，后跟你要定位的区间中最新的 commit 和最老的 commit。

```
$ git bisect start HEAD C0

Bisecting: 4 revisions left to test after this (roughly 2 steps)
[ee27077fdfc6c0c9281c1b7f6957ea2b59a461dd] C4
```

然后你就发现 HEAD 指针自动的指向了`C4`commit。如果范围是奇数位，那取中间就行了，如果范围是偶数位，则取中间更偏老的那个 commit，就比如这里的`C4`commit。

```
$ git bisect good

Bisecting: 2 revisions left to test after this (roughly 1 step)
[97cc0e879dc09796bd56cfd7c3a54deb41e447f6] C6
```

HEAD 指针指向`C4`commit 后，你应该运行一下程序，如果没问题，那说明有 bug 的提交在它之后。我们只需要告诉 git 当前 commit 以及更老的 commit 都是好的。

然后 HEAD 指针就自动指向`C6`commit。

继续在`C6`commit 运行程序，结果复现了 bug。说明问题就出在`C6`commit 和`C4`commit 之间。

```
$ git bisect bad

Bisecting: 0 revisions left to test after this (roughly 0 steps)
[a7e09bd3eab7d1e824c0338233f358cafa682af0] C5
```

将`C6`commit 标记为`bad`之后，HEAD 指针自动指向`C5`commit。再次运行程序，依然能复现 bug。话不多说，标记`C5`commit 为`bad`。

```
$ git bisect bad

a7e09bd3eab7d1e824c0338233f358cafa682af0 is the first bad commit
```

因为`C4`commit 和`C5`commit 之间已经不需要二分了，git 会告诉你，`C5`commit 是你标记为`bad`的最早的 commit。问题就应该出在`C5`commit 上。

```
git bisect reset

Previous HEAD position was a7e09bd... C5
Switched to branch 'master'
```

既然找到问题了，那就可以退出`git bisect`工具了。

另外，`git bisect old`和`git bisect good`的效果相同，`git bisect new`和`git bisect bad`的效果相同，这是因为 git 考虑到，有时候开发者并不是想定位 bug，只是想定位某个 commit，这时候用`good bad`就会有点别扭。

#### 后悔

`git bisect`确实很强大，但如果我已经`bisect`若干次，结果不小心把一个`good`commit 标记为`bad`，或者相反，难道我要`reset`重来么？

`git bisect`还有一个`log`命令，我们只需要保存`bisect`日志到一个文件，然后擦除文件中标记错误的日志，然后按新的日志重新开始`bisect`就好了。

```
git bisect log > log.txt
```

该命令的作用是将日志保存到`log.txt`文件中。

看看`log.txt`文件中的内容。

```
# bad: [4d5e75c7a9e6e65a168d6a2663e95b19da1e2b21] C9
# good: [c2fa7ca426cac9990ba27466520677bf1780af97] add a.md
git bisect start 'HEAD' 'c2fa7ca426cac9990ba27466520677bf1780af97'
# good: [ee27077fdfc6c0c9281c1b7f6957ea2b59a461dd] C4
git bisect good ee27077fdfc6c0c9281c1b7f6957ea2b59a461dd
# good: [97cc0e879dc09796bd56cfd7c3a54deb41e447f6] C6
git bisect good 97cc0e879dc09796bd56cfd7c3a54deb41e447f6
```

将标记错误的内容去掉。

```
# bad: [4d5e75c7a9e6e65a168d6a2663e95b19da1e2b21] C9
# good: [c2fa7ca426cac9990ba27466520677bf1780af97] add a.md
git bisect start 'HEAD' 'c2fa7ca426cac9990ba27466520677bf1780af97'
# good: [ee27077fdfc6c0c9281c1b7f6957ea2b59a461dd] C4
git bisect good ee27077fdfc6c0c9281c1b7f6957ea2b59a461dd
```

然后运行`git bisect replay log.txt`命令。

```
$ git bisect replay log.txt

Previous HEAD position was ad95ae3... C8
Switched to branch 'master'
Bisecting: 4 revisions left to test after this (roughly 2 steps)
[ee27077fdfc6c0c9281c1b7f6957ea2b59a461dd] C4
Bisecting: 2 revisions left to test after this (roughly 1 step)
[97cc0e879dc09796bd56cfd7c3a54deb41e447f6] C6
```

git 会根据 log 从头开始重新`bisect`，错误的标记就被擦除了。

然后就是重新做人啦。

## blame

一个充分协作的项目，每个文件可能都被多个人改动过。当出现问题的时候，大家希望快速的知道，某个文件的某一行是谁最后改动的，以便厘清责任。

`git blame`就是这样一个命令。`blame`翻译成中文是`归咎于`，这个命令就是用来甩锅的。

`git blame`只能作用于单个文件。

```
$ git blame a.md

705d9622 (veedrin 2018-12-25 10:09:04 +0800 1) 第一行
74eff2ee (abby 2018-12-25 10:16:44 +0800 2) 第二行
a65b29bd (bob 2018-12-25 10:17:02 +0800 3) 第三行
ee27077f (veedrin 2018-12-25 10:19:05 +0800 4) 第四行
a7e09bd3 (veedrin 2018-12-25 10:19:19 +0800 5) 第五行
97cc0e87 (veedrin 2018-12-25 10:21:55 +0800 6) 第六行
67029a81 (veedrin 2018-12-25 10:22:15 +0800 7) 第七行
ad95ae3f (zhangsan 2018-12-25 10:23:20 +0800 8) 第八行
4d5e75c7 (lisi 2018-12-25 10:23:37 +0800 9) 第九行
```

它会把每一行的修改者信息都列出来。

第一部分是 commit 哈希值，表示这一行的最近一次修改属于该次提交。

第二部分是作者以及修改时间。

第三部分是行的内容。

如果文件太长，我们可以截取部分行。

```
$ git blame -L 1,5 a.md

705d9622 (veedrin 2018-12-25 10:09:04 +0800 1) 第一行
74eff2ee (abby 2018-12-25 10:16:44 +0800 2) 第二行
a65b29bd (bob 2018-12-25 10:17:02 +0800 3) 第三行
ee27077f (veedrin 2018-12-25 10:19:05 +0800 4) 第四行
a7e09bd3 (veedrin 2018-12-25 10:19:19 +0800 5) 第五行
```

或者这样写。

```
$ git blame -L 1,+4 a.md

705d9622 (veedrin 2018-12-25 10:09:04 +0800 1) 第一行
74eff2ee (abby 2018-12-25 10:16:44 +0800 2) 第二行
a65b29bd (bob 2018-12-25 10:17:02 +0800 3) 第三行
ee27077f (veedrin 2018-12-25 10:19:05 +0800 4) 第四行
```

但是结果不是你预期的那样是吧。`1,+4`的确切意思是从 1 开始，显示 4 行。

如果有人重名，可以显示邮箱来区分。添加参数`-e`或者`--show-email`即可。

```
$ git blame -e a.md

705d9622 (veedrin@qq.com 2018-12-25 10:09:04 +0800 1) 第一行
74eff2ee (abby@qq.com 2018-12-25 10:16:44 +0800 2) 第二行
a65b29bd (bob@qq.com 2018-12-25 10:17:02 +0800 3) 第三行
ee27077f (veedrin@qq.com 2018-12-25 10:19:05 +0800 4) 第四行
a7e09bd3 (veedrin@qq.com 2018-12-25 10:19:19 +0800 5) 第五行
97cc0e87 (veedrin@qq.com 2018-12-25 10:21:55 +0800 6) 第六行
67029a81 (veedrin@qq.com 2018-12-25 10:22:15 +0800 7) 第七行
ad95ae3f (zhangsan@qq.com 2018-12-25 10:23:20 +0800 8) 第八行
4d5e75c7 (lisi@qq.com 2018-12-25 10:23:37 +0800 9) 第九行
```
