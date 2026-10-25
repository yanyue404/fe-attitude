# 小工具

跨语言、拿来就用的实用小工具。和 `javascript/`、`python/`、`test/` 平级：学习 demo、一次性草稿不放这里。

## 放置规则

- 能打开就用、会反复用的，才进 `tools/`；一次性草稿放 `test/`，语言学习 demo 放各语言目录
- 第一层按语言（运行时）分：`html/`、`python/`、`node/`、`shell/`
- 单文件直接放语言目录；出现第二个相关文件再升成子目录
- 文件名 kebab-case，不用空格、不用双后缀
- 同一能力的多语言实现用同名，并在本页互相链接
- 要上线的 HTML：源文件在 `html/`，再复制到 `site/.vuepress/public/tools/`（站点 URL 文件名保持原样，不随源文件改名）

## 索引

### html

浏览器打开即用。

| 文件 | 说明 |
| --- | --- |
| [regex.html](html/regex.html) | 正则表达式测试 |
| [format-markdown.html](html/format-markdown.html) | Markdown 格式化 |
| [text-diff.html](html/text-diff.html) | 文本对比 |
| [text-reformat.html](html/text-reformat.html) | 文本换行重排 |
| [docx-to-html.html](html/docx-to-html.html) | DOCX 转 HTML |
| [wechat2word.html](html/wechat2word.html) | 微信文章转 Word |
| [folder-tree.html](html/folder-tree.html) | 目录树导出 |
| [image-cutter.html](html/image-cutter.html) | 切图 |
| [storage-editor.html](html/storage-editor.html) | Browser Storage 编辑器 |
| [tampermonkey-generator.html](html/tampermonkey-generator.html) | 油猴脚本可视化生成器 |
| [clickArea.html](html/clickArea.html) | 点击区域辅助 |
| [calcWorkDay.html](html/calcWorkDay.html) | 排班/工作日推算（浏览器版，对应 [python/calc-workday.py](python/calc-workday.py)） |
| [mp-sp-skill-playbook.html](html/mp-sp-skill-playbook.html) | 双技能库命令与工作流 |
| [schedule/schedule.html](html/schedule/schedule.html) | 排班月历（领域词见 [schedule/GLOSSARY.md](html/schedule/GLOSSARY.md)） |

已发布到站点（副本在 `site/.vuepress/public/tools/`，URL 未改名）：

- Markdown 格式化：`/tools/format-Markdown.html`
- docx 转 html：`/tools/docx-to-Html.html`
- 正则表达式生成器：`/tools/regex.html`

### python

```bash
python tools/python/calc-workday.py
```

| 文件 | 说明 |
| --- | --- |
| [calc-workday.py](python/calc-workday.py) | 排班/工作日推算（脚本版，对应 [html/calcWorkDay.html](html/calcWorkDay.html)） |

依赖仓库内 `python/utils`，不要把学习用 utils 搬进本目录。

### node / shell

| 文件 | 说明 |
| --- | --- |
| [chrome-debug.sh](shell/chrome-debug.sh) / [chrome-debug.bat](shell/chrome-debug.bat) | 启动独立调试 Chrome（`127.0.0.1:9222`），给 chrome-devtools MCP 用 |

Git Bash 已加别名，新开一个终端后执行：

```bash
chrome-debug
```

或双击 `tools/shell/chrome-debug.bat`。日常 Chrome 不用关。
