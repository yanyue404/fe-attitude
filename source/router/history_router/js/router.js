class Router {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
  }
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }
  updateView(url) {
    this.currentUrl = url;
    this.routes[this.currentUrl] && this.routes[this.currentUrl]();
  }
  // 劫持 a 链接跳转
  listenALinks() {
    const allLink = document.querySelectorAll('a[data-href]');
    for (let i = 0, len = allLink.length; i < len; i++) {
      const current = allLink[i];
      current.addEventListener(
        'click',
        e => {
          e.preventDefault();
          const url = current.getAttribute('data-href');
          history.pushState({}, null, url);
          this.updateView(url);
        },
        false,
      );
    }
  }
  init() {
    this.listenALinks();
    // 监听点击浏览器的前进或后退按钮
    window.addEventListener('popstate', e => {
      this.updateView(window.location.pathname);
    });
    // 首次获取 根路径'/'视图
    window.addEventListener('load', () => this.updateView('/'), false);
  }
}
