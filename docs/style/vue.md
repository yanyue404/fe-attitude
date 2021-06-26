后缀为.vue 文件的书写规范，方便团队成员互看代码，提高工作协同。

# 1.vue 中的三部分书写顺序

- html <template></template>部分
- js <script></script>部分
- css <style></style>部分

# 2. vue 中的属性顺序

- data(){};
- props: [];
- components;
- computed();
- created();
- mounted();
- …………
- 按 vue 的生命周期依次排序；
- watch();
- methods;
- filters;

# 3.组件的命名

按驼峰命名

```
<template>
  <my-components></my-components>
</template>
<script>
  import myComponents from './myComponents.vue'

  export default {
  components: {
  	  myComponents
    }
  }
</script>
```

# 4.事件绑定

1. 用@代替 v-on;
2. 直接写方法名；

```
<!--推荐--->
<a @click="pass">pass</a>
```

```
<!--不推荐--->
<a v-on:click="pass()">pass</a>
```

#### 参考文章

- https://zhuanlan.zhihu.com/p/98065001
