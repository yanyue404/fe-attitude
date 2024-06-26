git 是一个数据库系统，git 是一个内容寻址文件系统，git 是一个版本管理系统。

没错，它都是。

不过我们不纠结于 git 是什么，我们单刀直入，介绍 git 命令。

要将未跟踪的文件和已跟踪文件的改动加入暂存区，我们可以使用`git add`命令。

不过很多人嫌`git add`命令不够语义化，毕竟这一步操作是加入暂存区呀。所以 git 又增加了另外一个命令`git stage`，它们的效果是一模一样的。

## git 仓库、工作区和暂存区

进入主题之前，我们先要介绍一下 git 仓库、工作区和暂存区的概念。

#### git 仓库

所谓的 git 仓库就是一个有`.git`目录的文件夹。它是和 git 有关的一切故事开始的地方。

可以使用`git init`命令初始化一个 git 仓库。

```
$ git init
```

也可以使用`git clone`命令从服务器上克隆仓库到本地。

```
$ git clone git@github.com:veedrin/horseshoe.git
```

然后你的本地就有了一个和服务器上一模一样的 git 仓库。

这里要说明的是，`clone`操作并不是将整个仓库下载下来，而是只下载`.git`目录。因为关于 git 的一切秘密都在这个目录里面，只要有了它，git 就能复原到仓库的任意版本。

#### 工作区(working directory)

工作区，又叫工作目录，就是不包括`.git`目录的项目根目录。我们要在这个目录下进行手头的工作，它就是版本管理的素材库。你甚至可以称任何与工作有关的目录为工作区，只不过没有`.git`目录 git 是不认的。

#### 暂存区(stage 或者 index)

`stage`在英文中除了有`舞台、阶段`之意外，还有作为动词的`准备、筹划`之意，所谓的暂存区就是一个为提交到版本库做准备的地方。

那它为什么又被称作`index`呢？因为暂存区在物理上仅仅是`.git`目录下的`index`二进制文件。它就是一个索引文件，将工作区中的文件和暂存区中的备份一一对应起来。

`stage`是表意的，`index`是表形的。

你可以把暂存区理解为一个猪猪储钱罐。我们还是孩子的时候，手里有一毛钱就会丢进储钱罐里。等到储钱罐摇晃的声音变的浑厚时，或者我们有一个心愿急需用钱时，我们就砸开储钱罐，一次性花完。

类比到软件开发，每当我们写完一个小模块，就可以将它放入暂存区。等到一个完整的功能开发完，我们就可以从暂存区一次性提交到版本库里。

这样做的好处是明显的：

- 它可以实现更小颗粒度的撤销。
- 它可以实现批量提交到版本库。

另外，添加到暂存区其实包含两种操作。一种是将还未被 git 跟踪过的文件放入暂存区；一种是已经被 git 跟踪的文件，将有改动的内容放入暂存区。

## 放入暂存区

git 默认是不会把工作区的文件放入暂存区的。

```
$ git status

On branch master
No commits yet
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	a.md
nothing added to commit but untracked files present (use "git add" to track)
```

我们看到文件现在被标注为`Untracked files`。表示 git 目前还无法追踪它们的变化，也就是说它们还不在暂存区里。

那么我们如何手动将文件或文件夹放入暂存区呢？

```
$ git add .
```

上面的命令表示将工作目录所有未放入暂存区的文件都放入暂存区。这时文件的状态已经变成了`Changes to be committed`，表示文件已经放入暂存区，等待下一步提交。每一次 add 操作其实就是为加入的文件或内容生成一份备份。

下面的命令也能达到相同的效果。

```
$ git add -A
```

假如我只想暂存单个文件呢？后跟相对于当前目录的文件名即可。

```
$ git add README.md
```

暂存整个文件夹也是一样的道理。因为 git 会递归暂存文件夹下的所有文件。

```
$ git add src
```

把从来没有被标记过的文件放入暂存区的命令是`git add`，暂存区中的文件有改动也需要使用`git add`命令将改动放入暂存区。

这时状态变成了`Changes not staged for commit`。

```
$ git status

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
no changes added to commit (use "git add" and/or "git commit -a")
```

针对已经加入暂存区的文件，要将文件改动加入暂存区，还有一个命令。

```
$ git add -u
```

它和`git add -A`命令的区别在于，它只能将已加入暂存区文件的改动放入暂存区，而`git add -A`通吃两种情况。

## 跟踪内容

假设我们已经将文件加入暂存区，现在我们往文件中添加内容，再次放入暂存区，然后查看状态。

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

哎，突然变的有意思了。为什么一个文件会同时存在两种状态，它是薛定谔的猫么？

想象一下，我想在一个文件中先修复一个 bug 然后增加一个 feather，我肯定希望分两次放入暂存区，这样可以实现颗粒度更细的撤销和提交。但是如果 git 是基于文件做版本管理的，它就无法做到。

所以 git 只能是基于内容做版本管理，而不是基于文件。版本管理的最小单位叫做 hunk，所谓的 hunk 就是一段连续的改动。一个文件同时有两种状态也就不稀奇了。

## objects

git 项目的`.git`目录下面有一个目录`objects`，一开始这个目录下面只有两个空目录：`info`和`pack`。

一旦我们执行了`git add`命令，`objects`目录下面就会多出一些东西。

```
.git/
.git/objects/
.git/objects/e6/
.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391
```

它多出了一个 2 个字符命名的目录和一个 38 个字符命名的文件。加起来正好是 40 个字符。增加一个 2 个字符的目录是为了提高检索效率。

SHA-1 是一种哈希加密算法，它的特点是只要加密的内容相同，得到的校验和也相同。当然这种说法是不准确的，但是碰撞的概率极低。

git 除了用内容来计算校验和之外，还加入了一些其他信息，目的也是为了进一步降低碰撞的概率。

重点是，SHA-1 算法是根据内容来计算校验和的，跟前面讲的 git 跟踪内容相呼应。git 被称为一个内容寻址文件系统不是没有道理的。

我们可以做个实验。初始化本地仓库两次，每次都新建一个 markdown 文件，里面写`## git is awesome`，记下完整的 40 个字符的校验和，看看它们是否一样。

```
.git/objects/56/46a656f6331e1b30988472fefd48686a99e10f
```

如果你真的做了实验，你会发现即便两个文件的文件名和文件格式都不一样，只要内容一样，它们的校验和就是一样的，并且就是上面列出的校验和。

现在大家应该对`git跟踪内容`这句话有更深的理解了。

#### 相同内容引用一个对象

虽然开发者要极力避免这种情况，但是如果一个仓库有多个内容相同的文件，git 会如何处理呢？

我们初始化一个本地仓库，新建两个不同名的文件，但文件内容都是`## git is awesome`。运行`git add .`命令之后看看神秘的`objects`目录下会发生什么？

```
.git/objects/56/46a656f6331e1b30988472fefd48686a99e10f
```

只有一个目录，而且校验和跟之前一模一样。

其实大家肯定早就想到了，git 这么优秀的工具，怎么可能会让浪费磁盘空间的事情发生呢？既然多个文件的内容相同，肯定只保存一个对象，让它们引用到这里来就好了。

#### 文件改动对应新对象

现在我们猜测工作区的文件和`objects`目录中的对象是一一对应起来的。但事实真的是这样吗？

我们初始化一个本地仓库，新建一个 markdown 文件，运行`git add .`命令。现在`objects`目录中已经有了一个对象。然后往文件中添加内容`## git is awesome`。再次运行`git add .`命令。

```
.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391
.git/objects/56/46a656f6331e1b30988472fefd48686a99e10f
```

哎，`objects`目录中出现了两个对象。第一个对象肯定对应空文件。第二个对象我们太熟悉了，对应的是添加内容后的文件。

再次强调，git 是一个版本管理系统，文件在它这里不是主角，版本才是。刚才我们暂存了两次，可以认为暂存区现在已经有了两个版本(暂存区的版本实际上是内容备份，并不是真正的版本)。当然就需要两个对象来保存。

#### 文件改动全量保存

初始化一个本地仓库，往工作区添加`lodash.js`未压缩版本，版本号是`4.17.11`，体积大约是`540KB`。运行`git add .`命令后`objects`目录下面出现一个对象，体积大约是`96KB`。

```
.git/objects/cb/139dd81ebee6f6ed5f5a9198471f5cdc876d70
```

我们对`lodash.js`文件内容作一个小小的改动，将版本号从`4.17.11`改为`4.17.10`，再次运行`git add .`命令。然后大家会惊奇的发现`objects`目录下有两个对象了。惊奇的不是这个，而是第二个对象的体积也是大约`96KB`。

```
.git/objects/cb/139dd81ebee6f6ed5f5a9198471f5cdc876d70
.git/objects/bf/c087eec7e61f106df8f5149091b8790e6f3636
```

明明只改了一个数字而已，第二个对象却还是这么大。

前面刚夸 git 会精打细算，怎么到这里就不知深浅了？这是因为多个文件内容相同的情况，引用到同一个对象并不会造成查询效率的降低，而暂存区的多个对象之间如果只保存增量的话，版本之间的查询和切换需要花费额外的时间，这样做是不划算的。

但是全量保存也不是个办法吧。然而 git 鱼和熊掌想兼得，它也做到了。后面会讲到。

#### 重命名会拆分成删除和新建两个动作

初始化一个本地仓库，新建一个文件，运行`git add .`命令。然后重命名该文件，查看状态信息。

```
$ git status

On branch master
No commits yet
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   a.md
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	deleted:    a.md
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	b.md
```

这是由于 git 的内部机制导致的。生成对象的时候，它发现仓库中叫这个名字的文件不见了，于是标记为已删除，又发现有一个新的文件名是之前没有标记过的，于是标记为未跟踪。因为它只是重命名而已，文件内容并没有改变，所以可以共享对象，并不会影响效率。

## blob 对象

git 的一切秘密都在`.git`目录里。因为它拥有项目的完整信息，所以 git 一定是把备份存在了某个地方。git 把它们存在了哪里，又是如何存储它们的呢？

这些备份信息，git 统一称它们为对象。git 总共有四种对象类型，都存在`.git/objects`目录下。

这一次我们只介绍 blob 对象。

它存储文件的内容和大小。当开发者把未跟踪的文件或跟踪文件的改动加入暂存区，就会生成若干 blob 对象。git 会对 blob 对象进行`zlib`压缩，以减少空间占用。

因为它只存储内容和大小，所以两个文件即便文件名和格式完全不一样，只要内容相同，就可以共享一个 blob 对象。

注意 blob 对象和工作目录的文件并不是一一对应的，因为工作目录的文件几乎会被多次添加到暂存区，这时一个文件会对应多个 blob 对象。

## index

仓库的`.git`目录下面有一个文件，它就是大名鼎鼎的暂存区。

是的，暂存区并不是一块区域，只是一个文件，确切的说，是一个索引文件。

它保存了项目结构、文件名、时间戳以及 blob 对象的引用。

工作区的文件和 blob 对象之间就是通过这个索引文件关联起来的。

## 打包

还记得我们在`文件改动全量保存`小节里讲到，git 鱼和熊掌想兼得么？

又想全量保存，不降低检索和切换速度，又想尽可能压榨体积。git 是怎么做到的呢？

git 会定期或者在推送到远端之前对 git 对象进行打包处理。

打包的时候保存文件最新的全量版本，基于该文件的历史版本的改动则只保存 diff 信息。因为开发者很少会切换到较早的版本中，所以这时候效率就可以部分牺牲。

需要注意的是，所有的 git 对象都会被打包，而不仅仅是 blob 对象。

git 也有一个`git gc`命令可以手动执行打包。

```
$ git gc

Counting objects: 11, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (9/9), done.
Writing objects: 100% (11/11), done.
Total 11 (delta 3), reused 0 (delta 0)
```

之前的 git 对象文件都不见了，`pack`文件夹多了两个文件。其中 `.pack` 后缀文件存储的就是打包前 git 对象文件的实际内容。

```
.git/objects/
.git/objects/info/
.git/objects/info/packs
.git/objects/pack/
.git/objects/pack/pack-99b4704a207ea3cc4924c9f0febb6ea45d4cdfd2.idx
.git/objects/pack/pack-99b4704a207ea3cc4924c9f0febb6ea45d4cdfd2.pack
```

只能说，`git gc`的语义化不够好。它的功能不仅仅是垃圾回收，还有打包。
