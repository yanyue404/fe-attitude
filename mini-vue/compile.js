// 遍历 dom 结构，解析表达式和插值表达式
class Compile {
  // el - 待编译模板，vm - KVue 实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    // 把模板中的内容移动到片段中操作
    this.$fragment = this.node2Fragment(this.$el);
    // 执行编译
    this.compile(this.$fragment);
    // 放回目标 $el
    this.$el.appendChild(this.$fragment);
  }

  node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    let child;
    while ((child = el.firstChild)) {
      // 直接搬家，更改原 dom
      fragment.appendChild(child);
    }
    return fragment;
  }
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      // 元素类型
      if (node.nodeType === 1) {
        // console.log('编译元素' + node.nodeName);
        this.compileElement(node);
        // 插值表达式
      } else if (this.isInterpolation(node)) {
        this.compileText(node);
      }

      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }
  isInterpolation(node) {
    // 是⽂文本且符合{{}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
  compileElement(node) {
    // <div k-model="foo" k-text="test" @click="onClick">
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, this.$vm, exp);
      }
    });
  }
  isDirective(attr) {
    return attr.indexOf('k-') === 0;
  }
  isEvent(attr) {
    return attr.indexOf('@') === 0;
  }
  // 文本替换
  compileText(node) {
    console.log('编译插值⽂文本: ' + RegExp.$1 + ' 是 ' + this.$vm[RegExp.$1]);

    const exp = RegExp.$1;
    this.update(node, exp, 'text'); // v-text
  }
  update(node, exp, dir) {
    let updatrFn = this[dir + 'Updater'];
    updatrFn && updatrFn(node, this.$vm[exp]); // 首次初始化
    // 创建 Watcher，初始化编译后完成依赖收集
    new Watcher(this.$vm, exp, function(value) {
      updatrFn && updatrFn(node, value);
    });
  }

  textUpdater(node, val) {
    node.textContent = val;
  }
  text(node, vm, exp) {
    this.update(node, exp, 'text');
  }
}
