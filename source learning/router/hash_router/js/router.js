class Router {
  constructor() {
    this.routes = {};
    this.currentUrl = '';
  }
  // 初始化订阅
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }
  // 监听回调 更新视图
  updateView() {
    this.currentUrl = location.hash.slice(1) || '/';
    this.routes[this.currentUrl] && this.routes[this.currentUrl]();
  }
  // 初始化 监听
  init() {
    window.addEventListener('load', this.updateView.bind(this), false);
    window.addEventListener('hashchange', this.updateView.bind(this), false);
  }
}
