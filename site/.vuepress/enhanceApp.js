export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  // 拦截工具页面的链接，让它们使用原生页面跳转而不是 Vue Router
  if (typeof window !== 'undefined') {
    // 在客户端执行
    const base = siteData.base || '/fe-attitude/'
    
    // 在路由守卫中拦截工具页面的导航
    router.beforeEach((to, from, next) => {
      // 如果目标路径是工具页面的 HTML 文件，使用原生页面跳转
      if (to.path.match(/^\/fe-attitude\/tools\/.+\.html$/) || to.path.match(/^\/tools\/.+\.html$/)) {
        // 构建完整的 URL
        const fullUrl = window.location.origin + to.fullPath
        // 使用原生页面跳转，绕过 Vue Router
        window.location.href = fullUrl
        return
      }
      next()
    })

    // 拦截页面内的链接点击事件（在 Vue Router 处理之前）
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a')
      if (target && target.href) {
        try {
          const url = new URL(target.href)
          const pathname = url.pathname
          // 检查是否是工具页面的链接
          if (pathname.match(/^\/fe-attitude\/tools\/.+\.html$/) || pathname.match(/^\/tools\/.+\.html$/)) {
            // 阻止默认行为，使用原生页面跳转
            e.preventDefault()
            e.stopPropagation()
            window.location.href = target.href
          }
        } catch (err) {
          // URL 解析失败，可能是相对路径，尝试检查 href 属性
          const href = target.getAttribute('href')
          if (href && (href.match(/^\/fe-attitude\/tools\/.+\.html$/) || href.match(/^\/tools\/.+\.html$/))) {
            e.preventDefault()
            e.stopPropagation()
            // 构建完整 URL
            const fullUrl = window.location.origin + (href.startsWith('/') ? href : base + href)
            window.location.href = fullUrl
          }
        }
      }
    }, true) // 使用捕获阶段，确保在其他事件处理器之前执行
  }
}
