git init            # 在当前目录初始化git仓库
git remote add origin https://github.com/repo_name.git        # 添加远程仓库
git clone <address> # 从给定地址创建git仓库（从git服务器获取地址）
git clone <address> -b <branch_name> <path/to/directory>  # 克隆git仓库到指定目录并检出指定分支
git clone <address> -b <branch_name> --single-branch  # 克隆单个分支

git add <file_name>   # 将文件添加（暂存）到git
git add *          # 将所有新的修改、删除、创建添加（暂存）到git
git reset file.txt # 从暂存区移除file.txt
git reset --hard   # 丢弃所有未提交的更改，硬重置文件到HEAD
git reset --soft <commit_id> # 移动HEAD指针
git reset --mixed <commit_id> # 移动HEAD指针并将其指向的提交中的文件复制到暂存区，
# 不提供参数时的默认行为
git reset -hard <commit_id> # 移动HEAD指针并将其指向的提交中的文件复制到暂存区
# 和工作目录，因此会丢弃所有未提交的更改

# git reset
# 1. 移动HEAD和当前分支
# 2. 重置暂存区
# 3. 重置工作区

# --soft = (1)
# --mixed = (1) & (2) (默认)
# --hard = (1) & (2) & (3)

git rm file.txt    # 从git和文件系统中删除file.txt
git rm --cached file.txt # 仅从git索引中删除file.txt
git status         # 显示尚未暂存的修改和内容

git branch                         # 显示所有分支（当前分支用星号标记）
git branch -a                     # 显示所有本地和远程分支

git branch my-branch               # 创建my-branch分支
git branch -d my-branch            # 删除my-branch分支
git checkout my-branch         	   # 切换到my-branch分支
git merge my-branch                # 将my-branch合并到当前分支
git push origin --delete my-branch # 删除远程分支
git branch -m <new-branch-name>    # 重命名分支
git checkout --orphan <branch_name> # 检出一个没有提交历史的分支
git branch -vv                     # 列出所有分支及其上游，以及分支上的最后一次提交
git branch -a                      # 列出所有本地和远程分支

git cherry-pick <commit_id>                     # 合并指定的提交
git cherry-pick <commit_id_A>^..<commit_id_B>   # 选择整个提交范围，其中A比B旧（^用于包含A）

git remote                         # 显示远程仓库
git remote -v                      # 显示拉取和推送的远程仓库
git remote add my-remote <address> # 创建远程仓库（从git服务器获取地址）
git remote rm my-remote            # 删除远程仓库

git log                      # 显示提交日志
# git log默认使用less命令，你可以使用这些：f=下一页，b=上一页，搜索=/<查询>，n=下一个匹配，p=上一个匹配，q=退出
git log --no-pager    # 显示提交日志而不使用less命令
git log --oneline            # 显示提交日志，每个提交一行

git log --oneline --graph --decorate    # 显示提交日志，每个提交一行并带图形 
git log --since=<time>                    # 显示自指定时间以来的提交日志
git log -- <file_name>
git log -p <file_name>       # 显示特定文件随时间的更改
git log <Branch1> ^<Branch2> # 列出branch1中不在branch2中的提交
git log -n <x>               # 列出最后x次提交
git log -n <x> --oneline     # 列出最后x次提交，每个提交一行
git grep --heading --line-number '<string/regex>' # 在被跟踪的文件中查找匹配模式的行
git log --grep='<string/regex>'                   # 搜索提交日志

git reflog                       # 记录本地仓库中分支和其他引用的头部何时被更新
git ls-files                     # 显示索引和工作树中文件的信息

git commit -m "msg"          # 用消息提交更改
git commit -m "title" -m "description" # 用标题和描述提交更改
git commit --amend           # 将暂存的更改与前一个提交合并，或在不更改其快照的情况下编辑前一个提交消息
git commit --amend --no-edit # 修改提交而不更改其提交消息
git commit --amend --author='Author Name <email@address.com>'    # 修改提交的作者
git push my-remote my-branch # 将提交推送到my-remote的my-branch（不推送标签）
git revert <commit-id>       # 通过创建新提交来撤销提交

git show                    # 显示一个或多个对象（blob、树、标签和提交）
git diff                     # 显示提交之间、提交与工作树之间的更改
git diff HEAD               # 显示工作目录与最后一次提交之间的更改
git diff --staged HEAD    # 显示暂存区与最后一次提交之间的更改

git diff --color             # 显示彩色差异
git diff --staged            # 显示为提交暂存的更改

git tag                           # 显示所有标签
git tag -a v1.0 -m "msg"          # 创建带注释的标签
git show v1.0                     # 显示version-1.0标签的描述
git tag --delete v1.0             # 删除本地目录中的标签
git push --delete my-remote v1.0  # 删除my-remote中的标签（小心不要删除分支）
git push my-remote my-branch v1.0 # 将v1.0标签推送到my-remote的my-branch
git fetch --tags                  # 从远程拉取标签

git pull my-remote my-branch   # 拉取并尝试将my-remote的my-branch合并到当前分支 git pull = git fetch && git merge


git stash                            # 暂存已暂存和未暂存的更改（执行后git status将是干净的）
git stash -u                         # 暂存所有内容，包括新的未跟踪文件（但不包括.gitignore）
git stash save "msg"                 # 带消息暂存
git stash list                       # 列出所有暂存
git stash pop                        # 删除最近的暂存并应用它
git stash pop stash@{2}              # 删除{2}暂存并应用它
git stash show                       # 显示暂存的描述
git stash apply                      # 保留暂存并将其应用到git
git stash branch my-branch stash@{1} # 从你的暂存创建分支
git stash drop stash@{1}             # 删除{1}暂存
git stash clear                      # 清除所有暂存

git rebase -i <commit_id>         # 从提交ID变基提交
git rebase --abort                # 中止正在运行的变基
git rebase --continue             # 在修复所有冲突后继续变基

git clean -f                      # 永久清理未跟踪的文件
git clean -f -d/git clean -fd     # 永久删除目录
git clean -f -X/git clean -fX    # 永久删除被忽略的文件
git clean -f -x/git clean -fx     # 永久删除被忽略和未被忽略的文件
git clean -d --dry-run            # 显示将被删除的内容


git config --global --list                   # 列出所有仓库的git配置
git config --global --edit                   # 打开编辑器编辑git配置文件
git config --global alias.<handle> <command> # 添加git别名以加速工作流程，例如
# 如果handle是st，command是status，那么运行git st将执行git status 
git config --global core.editor <editor_name>      # 配置默认编辑器


git archive <branch_name> --format=zip --outpute=./<archive_name>.zip # 从命名树创建文件存档


.gitignore
# 是一个包含你不想被暂存或跟踪的内容名称的文件
# 你通常在这里保存本地文件，如数据库、媒体等
# 你可以在网上找到关于在项目文件中忽略特定文件的好资源
# .gitignore也会被忽略 
.git
# 是仓库目录中包含git文件的隐藏目录。它在"git init"后创建


# 一些有用的笔记：

# 更好的提交消息：
#   有效调试的关键
#   为了让提交消息在调试中有效帮助，确保它简短并在构造时使用祈使语气
#   （如给出命令或指令般说话或书写）
#   也要为提交消息使用功能时态
#   你的提交消息中的第一个单词应该是以下之一：
#   Add
#   Create
#   Refactor
#   Fix
#   Release
#   Document
#   Modify
#   Update
#   Remove
#   Delete 等...

# 关于重置：
#   在共享仓库中使用git revert而不是git reset
#   git revert创建一个新提交，引入与指定提交相反的更改
#   Revert不会更改历史，原始提交保留在仓库中


# git中~和^的区别：
#   > ^ 或 ^n
#       >无参数：== ^1：第一个父提交
#       >n：第n个父提交

#   > ~ 或 ~n
#       >无参数：== ~1：向后第一个提交，跟随第一个父提交
#       >n：向后的提交数，仅跟随第一个父提交
#   注意：^和~可以组合使用

# 一些通过可视化提高git技能的工具：
#   https://git-school.github.io/visualizing-git/
#   https://learngitbranching.js.org/
