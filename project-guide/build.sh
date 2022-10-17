# sh ./tk-common/common/project-init/build.sh
echo "node -v"
node -v

echo "1. 配置 package.json 命令"
node ./tk-common/common/project-init/index.js

echo "2. 控制安装相关依赖"
npm i  @babel/eslint-parser@7.14.7 @nuxtjs/eslint-config@6.0.1 eslint@7.29.0 eslint-config-prettier@8.5.0 eslint-plugin-nuxt@2.0.0 eslint-plugin-vue@9.3.0 prettier@2.7.1 husky@7.0.1 @commitlint/cli@17.0.3 @commitlint/config-conventional@17.0.3 cz-customizable@6.9.1 lint-staged@9.5.0 --save-dev

echo "3. 复制代码规则文件并初始化 husky"
cp -r ./tk-common/common/project-init/guide/. ./
npm run prepare
