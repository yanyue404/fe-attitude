var tools = (function () {

     function Person(name,age,gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
      }

      Person.prototype.sayHellow = function(){
        console.log('你好, 我是' + this.name + ', 今年 ' + this.age + ' 岁了, 我是 ' + this.gender + ' 的')
      }
      //获取地址栏参数
      function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      }

      //方法包装成对象再返回
      var tools = {
        GetQueryString:GetQueryString,
        Person:Person
      }

      return tools;
    })();