你在一个分支上开展了一半的工作，突然有一件急事要你去处理。这时候你得切换到一个新的分支，可是手头上的工作你又不想立即提交。

这种场景就需要用到 git 的储藏功能。

## 储藏

想要储藏手头的工作，只需运行`git stash`命令。

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

```
$ git stash

Saved working directory and index state WIP on master: 974a2f2 update
```

`WIP`是`work in progress`的缩写，指的是进行中的工作。

```
$ git status

On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	c.md
nothing added to commit but untracked files present (use "git add" to track)
```

可以看到，除了未被 git 跟踪的文件之外，工作区和暂存区的内容都会被储藏起来。现在你可以切换到其他分支进行下一步工作了。

## 查看

我们看一下储藏列表。

```
$ git stash list

stash@{0}: WIP on master: 974a2f2 apple
stash@{1}: WIP on master: c27b351 banana
```

## 恢复

等我们完成其他工作，肯定要回到这里，继续进行中断的任务。

```
$ git stash apply

On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)
	modified:   a.md
	modified:   b.md
Untracked files:
  (use "git add <file>..." to include in what will be committed)
	c.md
no changes added to commit (use "git add" and/or "git commit -a")
```

诶，等等。怎么`a.md`的变更也跑到工作区了？是的，`git stash`默认会将暂存区和工作区的储藏全部恢复到工作区。如果我就是想原样恢复呢？

```
$ git stash apply --index

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

加一个参数`--index`就会让工作区的归工作区，让暂存区的归暂存区。

还有一点需要注意，恢复储藏的操作可以应用在任何分支，它也不关心即将恢复储藏的分支上，工作区和暂存区是否干净。如果有冲突，自行解决就是了。

我们浏览过储藏列表，说明`git stash apply`仅仅是恢复了最新的那一次储藏。

```
$ git stash apply stash@{1}
```

指定储藏的名字，我们就可以恢复列表中的任意储藏了。

这个时候我们再看一下储藏列表。

```
$ git stash list

stash@{0}: WIP on master: 974a2f2 apple
stash@{1}: WIP on master: c27b351 banana
```

诶，发现还是两条。我不是已经恢复了一条么？

`apply`这个词很巧妙，它只是应用，它可不会清理。

## 清理

想要清理储藏列表，咱们得显式的运行`git stash drop`命令。

```
$ git stash drop stash@{1}
```

```
$ git stash list

stash@{0}: WIP on master: 974a2f2 apple
```

现在就真的没有了。希望你没有喝酒 🙃。

git 还给我们提供了一个快捷操作，运行`git stash pop`命令，同时恢复储藏和清理储藏。

```
$ git stash pop
```
