
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "mocha": true,
        "node":true,
    },
    // "extends": "eslint:recommended",//默认规则
    "extends": "airbnb",
   
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "html",
        "jsx-a11y"
    ],
    "rules": {
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "off", 
            "windows" //关掉换行报错 
        ],
        "quotes": [
            "off",
            "double" //字符串首先要用""包含起来 
        ],
        "semi": [
            "error",
            "always" //”;”一直要记得加 
        ],
        //0:关闭，1:警告，2:异常
        "no-console": 0, //允许使用console 
        "no-use-before-define": 0,
        // "eqeqeq": 2, //使用===和!== 
        "no-else-return": 2, //if语句中不准在return之后使用else 
        "no-empty-function": 2,//禁止出现空函数 
        "no-cond-assign": "error", //在条件判断中不能出现赋值语句
        "no-trailing-spaces":0,
        "prefer-arrow-callback": "warn",
        "padded-blocks":0,
        "max-len":"warn",
        //ES6的箭头回调函数标记法     

        
       
    }
};