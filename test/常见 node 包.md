- minimist
1. 1. 使用webpack-bundle-analyzer查看冗余代码
2. elementUI、crypto-js和lodash可以改成按需引入
3. vue、vuex、vue-router、elliptic相关资源变动频率低，可以放到cdn，通过external配置使其不参与打包
4. 使用unused-files-webpack-plugin查找无用文件
5. 2. package.json 没有找到引用的地方，可以去掉了
  6. node-sass改成sass
 6. 关闭 prefetch、preload
prefetch：用来告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容
preload：用来指定页面加载后很快会被用到的资源，所以在页面加载的过程中，我们希望在浏览器开始主体渲染之前尽早 preload

前端开启gzip
打包产物新增gzip 资源，页面加载优先使用
