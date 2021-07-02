# Vue-demos

## Guide

- [guide](https://cn.vuejs.org/v2/guide/) / [api](https://cn.vuejs.org/v2/api/)
- [vue-stepbystep](https://github.com/malun666/vue-stepbystep) http://aicoder.com/vue/preview/all.html
- [dk-lan/vue](https://github.com/dk-lan/vue)
- [Vue.js 菜鸟教程](http://www.runoob.com/vue2/vue-tutorial.html)
- [awesome-vue](https://github.com/vuejs/awesome-vue)
- [vue-api](https://github.com/lanzhsh/vue-api) vue 中 extend，mixins，extends，components,install 的几个 api 对比

## 生命周期

### 1.加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

### 2.子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

### 3.父组件更新过程

父 beforeUpdate->父 updated

### 4.销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

> 总结：从外到内，再从内到外

## Vue 生态圈

> https://risingstars.js.org/2017/zh/#section-vue

- [vuex](https://github.com/vuejs/vuex)
- [vue-router](https://github.com/vuejs/vue-router)
- [vue-cli](https://github.com/vuejs/vue-cli)

### 组件库

> pc

- [element](https://github.com/ElemeFE/element)
- [iview](https://github.com/iview/iview) A high quality UI Toolkit built on Vue.js 2.0 https://iviewui.com/
- [vuetify](https://github.com/vuetifyjs/vuetify) Material Component Framework for Vue.js 2 https://vuetifyjs.com

> mobile

- [mint-ui](https://github.com/ElemeFE/mint-ui/)
- vant

## Project

- [vue2-happyfri](https://github.com/bailicangdu/vue2-happyfri) vue2 + vue-router + vuex 入门项目
- [vue2-elm](https://github.com/bailicangdu/vue2-elm)
  基于 vue2 + vuex 构建一个具有 45 个页面的大型单页面应用
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## Source code Study

- [Vue 技术内幕](http://hcysun.me/vue-design/)
- [woai3c/mini-vue](https://github.com/woai3c/mini-vue) 模仿 Vue1.0 写的迷你版 Vue
- [learn-vue2-mvvm](https://github.com/wangfupeng1988/learn-vue2-mvvm)
