module.exports = {
  base: '/fe-attitude/',
  title: '我的前端知识体系',
  description: '记录自己的学习考古，会前端真的可以“为所欲为”maybe',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '静态站点',
        items: [
          {
            text: '原创',
            items: [
              { text: '我的博客文章', link: 'https://yanyue404.github.io/blog/' },
              { text: 'mingdao', link: 'https://yanyue404.github.io/mingdao/' },
              { text: 'my-bookmarks', link: 'https://yanyue404.github.io/my-bookmarks/' },
              { text: 'dev-admin', link: 'https://yanyue404.github.io/dev-admin/' }
            ]
          },
          {
            text: 'Fork',
            items: [
              {
                text: 'vant',
                link: 'https://yanyue404.github.io/vant/#/zh-CN'
              },
              {
                text: 'element',
                link: 'https://yanyue404.github.io/element/#/zh-CN/'
              }
            ]
          }
        ]
      },
      {
        text: '专题学习计划',
        link: '/topic/'
      }
    ],
    sidebar: [
      ['/fe/html', 'Html'],
      ['/fe/css', 'CSS'],
      ['/fe/javascript', 'JavaScript'],
      ['/fe/write', '手写代码'],
      ['/fe/console', '输出结果'],
      ['/fe/browser', '浏览器'],
      ['/fe/network', '计算机网络'],
      ['/fe/algorithm', '算法'],
      ['/fe/vue', 'Vue'],
      ['/fe/engineering', '工程化'],
      ['/fe/node', 'Node'],
      ['/fe/ts', 'TypeScript'],
      ['/fe/skill', '编程技巧']
    ],
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
