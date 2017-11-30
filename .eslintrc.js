module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node":true
    },
    // "extends": "eslint:recommended",//默认规则
    "extends": "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
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
        "no-console": 0, //允许使用console 
        // "eqeqeq": 2, //使用===和!== 
        "no-else-return": 2, //if语句中不准在return之后使用else 
        "no-empty-function": 2,//禁止出现空函数 
        "no-cond-assign": "error", //在条件判断中不能出现赋值语句
        "prefer-arrow-callback": "warn"//ES6的箭头回调函数标记法
    }
};