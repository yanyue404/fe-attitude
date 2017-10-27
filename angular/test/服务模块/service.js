/**
 * Created by Administrator on 2017/9/5 0005.
 */
angular.module('myApp.service', [])
    .service('myservice', [function () {
        this.name = "zhangsan";
        this.fn = function () {
            alert('我是李四')
        }

    }])