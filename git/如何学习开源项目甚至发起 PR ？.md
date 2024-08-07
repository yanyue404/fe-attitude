## 源码学习

### 1. 对项目足够了解

- [一年内的前端看不懂前端框架源码怎么办？](https://www.zhihu.com/question/350289336)

### 2. 查看项目早期代码

**早期提交日志**

参数说明：

- `--pretty=format` 控制显示的记录格式
- `--reverse` 倒序排列
- `-n` 查看前 `n`条纪录

```bash
$ git log --pretty=format:"%h [%an - %ar] : %s" --reverse

# Vue
5f19affa [Evan You - 5 years ago] : init
706c67d1 [Evan You - 5 years ago] : restructure

# checkout 到 commmit id
$ git  checkout 706c67d1
# 再回来
$ git checkout master

# --pretty=format 显示控制参数
选项	 说明
%H	提交对象（commit）的完整哈希字串
%h	提交对象的简短哈希字串
%T	树对象（tree）的完整哈希字串
%t	树对象的简短哈希字串
%P	父对象（parent）的完整哈希字串
%p	父对象的简短哈希字串
%an	作者（author）的名字
%ae	作者的电子邮件地址
%ad	作者修订日期（可以用 -date= 选项定制格式）
%ar	作者修订日期，按多久以前的方式显示
%cn	提交者(committer)的名字
%ce	提交者的电子邮件地址
%cd	提交日期
%cr	提交日期，按多久以前的方式显示
```

制作常用命令别名

```bash
$ git config --global alias.logs "log --pretty=format:'%h [%an - %ar] : %s'"

# 使用
$ git logs --reverse
```

#### 参考资料

- [git log 常用命令及技巧](https://blog.csdn.net/sky1203850702/article/details/41007895)
- [How do I find the date of the first commit in a GitHub repository?](https://webapps.stackexchange.com/questions/43742/how-do-i-find-the-date-of-the-first-commit-in-a-github-repository/59893)
- [JavaScript 实现 MVVM 之我就是想监测一个普通对象的变化](http://hcysun.me/2016/04/28/JavaScript%E5%AE%9E%E7%8E%B0MVVM%E4%B9%8B%E6%88%91%E5%B0%B1%E6%98%AF%E6%83%B3%E7%9B%91%E6%B5%8B%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%8F%98%E5%8C%96/)
- [vue 早期源码学习系列之一：如何监听一个对象的变化 ](https://github.com/youngwind/blog/issues/84)
- [vue 源码分析之如何实现 observer 和 watcher](https://segmentfault.com/a/1190000004384515)
- [Vue2.1.7 源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)
