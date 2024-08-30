## 如何搜索

1、使用 GitHub 自带的网页搜索。

2、使用  [Sourcegraph.com](https://sourcegraph.com/github.com/ruanyf/weekly)  进行搜索。

3. 将这个仓库克隆到本地，然后在仓库目录使用下面的命令。

```bash
$ grep -nri [搜索词] docs | cat --number
```

比如，搜索 `vue3` 相关内容。

```bash
$ grep -nri vue3 docs | cat --number
```
