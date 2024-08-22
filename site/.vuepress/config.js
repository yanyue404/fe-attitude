module.exports = {
  base: '/fe-attitude/',
  title: '我的前端态度',
  description: '记录自己的学习考古，会前端真的可以“为所欲为”maybe',
  themeConfig: {
    nav: [
      {
        text: '使用资源',
        items: [
          {
            text: '推荐资源',
            items: [
              { text: '在线工具', link: '/use/website' },
              { text: '前端库与框架', link: '/use/repos' },
              { text: '优秀文章', link: '/use/articles' }
            ]
          }
        ]
      },

      {
        text: '静态站点',
        items: [
          {
            text: '我的原创作品',
            items: [
              { text: '个人博客', link: 'https://yanyue404.github.io/blog/' },
              { text: '博客代码库', link: 'https://github.com/yanyue404/blog' },
              { text: 'Mingdao 项目', link: 'https://yanyue404.github.io/mingdao/' },
              { text: '开发者后台演示', link: 'https://yanyue404.github.io/dev-admin/' }
            ]
          },
          {
            text: '开源项目 Fork',
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
    repo: 'https://github.com/yanyue404/fe-attitude'
  }
}
