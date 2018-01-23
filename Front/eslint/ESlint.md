## ESLint的使用
>ESLint 是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码。

- 首先，安装 ESLint。

- $ npm i -g eslint
然后，安装 Airbnb 语法规则，以及 import、a11y、react 插件。

- $ npm i -g eslint-config-airbnb
- $ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
- 最后，在项目的根目录下新建一个.eslintrc文件，配置ESLint。

```
{
  "extends": "eslint-config-airbnb"
}
```


现在就可以检查，当前项目的代码是否符合预设的规则。

- index.js文件的代码如下。

```
var unusued = 'I have no purpose!';

function greet() {
    var message = 'Hello, World!';
    alert(message);
}
greet();
```




使用 ESLint 检查这个文件，就会报出错误。

```
$ eslint index.js
index.js
  1:1  error  Unexpected var, use let or const instead          no-var
  1:5  error  unusued is defined but never used                 no-unused-vars
  4:5  error  Expected indentation of 2 characters but found 4  indent
  4:5  error  Unexpected var, use let or const instead          no-var
  5:5  error  Expected indentation of 2 characters but found 4  indent

✖ 5 problems (5 errors, 0 warnings)
```
>上面代码说明，原文件有五个错误，其中两个是不应该使用var命令，而要使用let或const；一个是定义了变量，却没有使用；另外两个是行首缩进为4个空格，而不是规定的2个空格。


```
"arrow-parens": 0, //箭头函数用小括号括起来
"indent": ["error", 4, { "SwitchCase": 1 }], //缩进风格
"eol-last": 0, // 文件以单一的换行符结束
"semi": 2,//语句强制分号结尾
"semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
"space-before-function-paren": 0, //函数定义时括号前面要不要有空格
"no-useless-escape": 0,
"no-alert": 2,
"no-eval": 2,//禁止使用eval
"no-implied-eval": 2,//禁止使用隐式eval
'generator-star-spacing': 0,  //生成器函数*的前后空格
'comma-dangle': ["error", 'only-multiline'],  //对象字面量项尾不能有逗号
"no-new-func": 2,//禁止使用new Function
"no-new-object": 2,//禁止使用new Object()
"no-new-require": 2, //禁止使用new require
"no-new": 2,//禁止在使用new构造一个实例后不赋值
"no-undef": 2,//不能有未定义的变量
"no-unexpected-multiline": 2,//避免多行表达式
"no-unused-vars": [2, {"vars": "all", "args": "after-used"}],//不能有声明后未被使用的变量或参数
"no-use-before-define": 2,//未定义前不能使用
"eqeqeq": 2,//必须使用全等
"quotes": [2, "single"],//引号类型 `` "" ''
"quote-props":[2, "always"] //对象字面量中的属性名是否强制双引号
```

- vscode中使用eslint插件

  + npm i eslint -g          //先全局安装eslint
  + cd yourDocumentPath      //进入你的文件目录
  + eslint --init        //初始化eslint
  
  + npm install eslint-plugin-html --save-dev
