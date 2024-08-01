module.exports = {
  base: '/fe-log/',
  title: '我的前端日志',
  description: '记录自己的学习考古，会前端真的可以“为所欲为”maybe',
  themeConfig: {
    nav: [
      {
        text: 'Use',
        items: [
          {
            text: '资源',
            items: [
              { text: '在线网站', link: '/use/website' },
              { text: '前端库', link: '/use/repos' },
              { text: '好的文章', link: '/use/articles' }
            ]
          }
        ]
      },

      {
        text: '静态站点',
        items: [
          {
            text: '原创',
            items: [
              { text: '我的博客文章', link: 'https://yanyue404.github.io/blog/' },
              { text: '我的博客文章(repo)', link: 'https://github.com/yanyue404/blog' },
              { text: 'mingdao', link: 'https://yanyue404.github.io/mingdao/' },
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
              },
              {
                text: 'vue-design',
                link: 'https://yanyue404.github.io/vue-design/'
              },
              {
                text: 'vue2',
                link: 'https://yanyue404.github.io/vue2/'
              },
              {
                text: 'vue-template-compiler-playground',
                link: 'https://yanyue404.github.io/vue-template-compiler-playground/'
              }
            ]
          }
        ]
      },
      {
        text: '构建知识体系',
        link: '/fe/'
      },
      {
        text: '专题学习计划',
        link: '/topic/'
      }
    ],
    sidebar: {
      '/use/website': 'auto',
      '/use/repos': 'auto',
      '/use/articles': 'auto',
      '/topic': 'auto',
      // fallback: 确保 fallback 侧边栏被最后定义。VuePress 会按顺序遍历侧边栏配置来寻找匹配的配置。
      '/fe/': [
        ['/fe/html', 'Html'],
        ['/fe/css', 'CSS'],
        ['/fe/javascript', 'JavaScript'],
        ['/fe/write', '手写代码'],
        ['/fe/console', '输出结果'],
        ['/fe/design', '设计模式'],
        ['/fe/browser', '浏览器'],
        ['/fe/network', '计算机网络'],
        ['/fe/algorithm', '算法'],
        ['/fe/vue', 'Vue'],
        ['/fe/react', 'React'],
        ['/fe/node', 'Node'],
        ['/fe/typescript', 'TypeScript'],
        ['/fe/skill', '编程技巧'],
        ['/fe/engineering', '工程化']
      ]
    },
    smoothScroll: true,
    sidebarDepth: 2,
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页',
    lastUpdated: '上次更新', // string | boolean
    docsDir: 'site',
    // displayAllHeaders: true,
    repo: 'https://github.com/yanyue404/fe-log'
  }
}
