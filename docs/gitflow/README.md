## Dev 开发

```bash
# 创建分支并提交到远端
git branch dev
git push -u origin dev

# 切换到 dev 分支开发
git clone git@github.org:search-cloud/demo.git
git checkout -b dev origin/dev
```

## 新功能开发

```bash
# 基于 dev 分支创建新功能分支,推送远端，共享
git checkout -b feature/demo dev
git push

# 在 feature 开发完成，且联调测试通过，并且新功能负责人已经得到合并feature分支至dev分支的允许，准备合并
git pull origin dev
git checkout dev
git merge feature/demo
git push
git branch -d feature/demo
```

## 线上版本发布

```bash
# 从dev 中创建准备发布的release分支
git checkout -b release-0.1.0 dev

# 推送到远端共享：
git push

# 使用master发布新版本
git checkout master
git merge release-0.1.0
git push

# release分支合并到 dev
git checkout dev
git merge release-0.1.0
git push
git branch -d release-0.1.0
```

## 线上 Bug 修复

当终端用户，反馈系统有 bug 时，为了处理 bug，需要从 master 中创建出保养分支；等到 bug 修复完成，需要合并回 master：

```bash
# 创建hotfix分支
git checkout -b issue-#001 master

# fix bug后,合并
git checkout master
git merge issue-#001
git push

# 合并到 dev分支
git checkout dev
git merge issue-#001
git push
git branch -d issue-#001
```

#### 参考链接

- [Git Flow 工作流程](https://www.jianshu.com/p/9a76e9aa9534)
- [gitflow 工作流程](https://www.lishuaishuai.com/tools/791.html)
- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [GitHub 从单机到联机：玩转 Pull Request](https://www.jianshu.com/p/ac33f0295629)
- [Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
- https://learngitbranching.js.org/
