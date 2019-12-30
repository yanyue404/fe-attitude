// typeof: 用于判断 "number"，"string"，"boolean"或 "symbol" 四种类型.
// instanceof : 用于判断一个实例是否属于某个类
// in: 用于判断一个属性/方法是否属于某个对象
// 字面量类型保护
function padLeft(value, padding) {
    if (typeof padding === 'number') {
        console.log(padding + 2); //正常
        return Array(padding + 1).join(' ') + value; //正常
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
}
var Man = /** @class */ (function () {
    function Man() {
        this.handsome = 'handsome';
    }
    return Man;
}());
var Woman = /** @class */ (function () {
    function Woman() {
        this.beautiful = 'beautiful';
    }
    return Woman;
}());
function Human(arg) {
    if (arg instanceof Man) {
        console.log(arg.handsome);
        // console.log(arg.beautiful); // error
    }
    else {
        // 这一块中一定是 Woman
        console.log(arg.beautiful);
    }
}
function foo(x) {
    if ('a' in x) {
        return x.a;
    }
    return x.b;
}
