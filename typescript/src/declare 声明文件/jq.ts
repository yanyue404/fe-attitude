// ## 防止命名冲突, 命名空间保护
// 暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下13：

// src/jQuery.d.ts

declare namespace jQuery {
  interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
  }
  function ajax(url: string, settings?: AjaxSettings): void
}
// 注意，在使用这个 interface 的时候，也应该加上 jQuery 前缀：

// src/index.ts

let settings: jQuery.AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo'
  }
}
jQuery.ajax('/api/post_something', settings)

// ## 声明合并

// 假如 jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来14：

// src/jQuery.d.ts

declare function jQuery(selector: string): any
declare namespace jQuery {
  function ajax(url: string, settings?: any): void
}

// src/index.ts

jQuery('#foo')
jQuery.ajax('/api/get_something')
