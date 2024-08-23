module.exports = {
  base: '/fe-attitude/',
  title: '我的前端态度',
  meta: '我的前端态度',
  description: '记录自己的学习考古，会前端真的可以“为所欲为”maybe',
  themeConfig: {
    nav: [
      {
        text: '构建前端知识体系',
        items: [
          { text: 'Html', link: '/fe/html' },
          { text: 'CSS', link: '/fe/css' },
          { text: 'JavaScript', link: '/fe/javascript' },
          { text: '手写代码', link: '/fe/write' },
          { text: '输出结果', link: '/fe/console' },
          { text: '设计模式', link: '/fe/design' },
          { text: '浏览器', link: '/fe/browser' },
          { text: '计算机网络', link: '/fe/network' },
          { text: '算法', link: '/fe/algorithm' },
          { text: 'Vue', link: '/fe/vue' },
          { text: 'React', link: '/fe/react' },
          { text: 'Node', link: '/fe/node' },
          { text: 'TypeScript', link: '/fe/typescript' },
          { text: '编程技巧', link: '/fe/skill' },
          { text: '工程化', link: '/fe/engineering' }
        ]
      },
      {
        text: '专题学习计划',
        link: '/topic/',
        items: [
          {
            text: '正则表达式',
            items: [
              { text: '正则手记——语法篇', link: 'https://github.com/yanyue404/blog/issues/113' },
              { text: '正则手记——方法篇', link: 'https://github.com/yanyue404/blog/issues/245' },
              { text: '正则手记——实例篇', link: 'https://github.com/yanyue404/blog/issues/230' }
            ]
          },
          {
            text: '前端常见需求的解决方案',
            items: [{ text: '玩转异步', link: 'https://github.com/yanyue404/blog/issues/248' }]
          },
          {
            text: '组件库源码学习课',
            items: [
              { text: 'vant2 popup 源码学习', link: 'https://github.com/yanyue404/blog/issues/250' },
              { text: '跟着 Vant Dialog 学习函数调用使用组件', link: 'https://github.com/yanyue404/blog/issues/268' }
            ]
          },
          {
            text: 'Vue 源码解读',
            items: [{ text: '探索 Vue.js 内部运行机制', link: 'https://github.com/yanyue404/blog/issues/274' }]
          }
        ]
      },
      {
        text: '使用资源',
        items: [
          {
            text: '推荐资源',
            items: [
              { text: '在线工具', link: '/use/website' },
              { text: '在线教程', link: '/use/tutorial' },
              { text: '前端库与框架', link: '/use/repos' },
              { text: '优秀文章', link: '/use/articles' }
            ]
          },
          {
            text: '打造舒适、高效、时尚的前端开发环境',
            items: [
              { text: '开发环境的搭建', link: 'https://github.com/yanyue404/blog/issues/3' },
              { text: 'Git', link: 'https://github.com/yanyue404/blog/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+git' },
              { text: '玩好 Terminal 终端 ', link: 'https://github.com/yanyue404/blog/issues/42' },
              { text: 'VS Code 编辑器配置 ', link: 'https://github.com/yanyue404/blog/issues/185' },
              { text: 'Whistle 代理抓包 ', link: 'https://github.com/yanyue404/blog/issues/204' },
              {
                text: 'Node.js',
                link: 'https://github.com/yanyue404/blog/issues?q=is%3Aissue+is%3Aopen+in%3Atitle+node'
              }
            ]
          }
        ]
      },
      {
        text: '我的 Reops',
        items: [
          {
            text: '原创作品',
            items: [
              { text: '个人博客', link: 'https://github.com/yanyue404/blog/issues' },
              { text: 'node 爬虫自用工具', link: 'https://github.com/yanyue404/node-crawler' },
              { text: 'beyond-ui', link: 'https://github.com/yanyue404/beyond-ui' },
              { text: '用于开发的管理工具', link: 'https://yanyue404.github.io/dev-admin/' },
              { text: 'GitHub Issue 博客静态站点生成', link: 'https://github.com/yanyue404/nuxt-issue-blog' },
              { text: '油猴脚本 & 浏览器扩展', link: 'https://github.com/yanyue404/build-my-own-extension' },
              { text: 'VS Code 快速语音笔记插件', link: 'https://github.com/yanyue404/vscode-extension-ts' }
            ]
          },
          {
            text: 'Npm',
            items: [
              { text: 'rainbow 的 实用函数', link: 'https://github.com/yanyue404/rainbow-shared' },
              {
                text: 'Export Github Issues to markdown file',
                link: 'https://github.com/yanyue404/issues2md'
              }
            ]
          },
          {
            text: '开源项目文档（Fork)',
            items: [
              { text: 'Vant 组件库', link: 'https://yanyue404.github.io/vant/#/zh-CN' },
              { text: 'Element 组件库', link: 'https://yanyue404.github.io/element/#/zh-CN/' },
              { text: 'Vue 技术内幕', link: 'https://yanyue404.github.io/vue-design/' },
              { text: 'Vue 2 官方文档', link: 'https://yanyue404.github.io/vue2/' },
              {
                text: 'Vue 模板编译器 Playground',
                link: 'https://yanyue404.github.io/vue-template-compiler-playground/'
              }
            ]
          },
          {
            text: '其他兴趣',
            items: [
              { text: '记录王明道先生的文字', link: 'https://yanyue404.github.io/mingdao/' },
              { text: 'How to Cook', link: 'https://github.com/yanyue404/cook' }
            ]
          }
        ]
      }
    ],
    sidebar: {
      '/fe/': 'auto',
      '/use/': 'auto',
      '/topic/': 'auto'
    },
    smoothScroll: true,
    sidebarDepth: 2,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新', // string | boolean
    docsDir: 'site',
    displayAllHeaders: true,
    repo: 'https://github.com/yanyue404/fe-attitude'
  }
}
