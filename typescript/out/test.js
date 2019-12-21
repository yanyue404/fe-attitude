var Greeter = /** @class */ (function () {
    function Greeter() {
    }
    Greeter.prototype.sayHello = function () {
        console.log('Hello' + name);
    };
    return Greeter;
}());
function sortByName(a) {
    var result = a.slice(0);
    result.sort(function (x, y) {
        return x.name.localeCompare(y.name);
    });
    return result;
}
sortByName([]);
