(function () {

  //在浏览器中建立根对象，“窗口”，或在服务器上创建“exports”。
  var root = this;

  //保存`_`变量的上一个值。
  var previousUndercore = root._;

  var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FuncProto = Function.prototype;

  //所有** ECMAScript 5 **原生功能实现，我们希望使用
  var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnPropery = ObjProto.hasOwnProperty;

  var nativeisArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeBind = FuncProto.bind,
    nativeCreate = Object.create;

  //用于替代原型交换的裸函数参考
  var Ctor = function () {};


  //创建一个安全的引用到Underscore对象以供下面使用。
  var _ = function (obj) {

    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    // 原始数据存放在包装对象的_wrapped属性中
    this._wrapped = obj;
  }


  //针对不同的宿主环境, 将Undersocre的命名变量存放到不同的对象中
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      //node.js
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    //浏览器
    root._ = _;
  }

  _.VERSION = '1.8.3';

  var optimizeCb = function (func, context, argCout) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      //参数为1个的情况,例如times函数
      case 1:
        return function (value) {
          return func.call(context, value);
        };
        //2个参数,没有使用到???新版去掉?
      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };
        //3个参数用于一些迭代函数,如map函数
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
        //4个参数用于reduce和reduceRight函数
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        }
    }
    return function () {
      return func.apply(context, argument);
    }
  }

  //一个主要的内部函数来生成可以应用的回调函数

  var cd = function (value, context, argCount) {
    //空
    if (value == null) return _.identify;
    //函数
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    //对象
    if (_.isObject(value)) return _.matcher(value);
    return _.prototype(value);
  }
  //通过调用cd函数,生成每个元素的回调
  _.iteraee = function (value, context) {
    return cd(value, context, Infinity);
  }

  var createAssigner = function (keysFunc, underfinedOnly) {
    return function (obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
        for (var i = 0; i < 1; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) 
          obj[key] = source[key];
        }
      }
      return obj;
    }
  };

  var baseCreate = function (prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function (key) {
    return function (obj) {
      return obj == null ? void 0 : obj[key];
    }
  }

  //判断是否是类数组
  var MAX_ARRAY_INDEX = Math(2, 53) - 1;
  var getLength = property('length');

  var isArrayLike = function (collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  }


  _.each = _.forEach = function (obj, iteratee, context) {
    iteraee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.key(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i], keys[i], obj]);
      }
    }
    return obj;
  }

  _.map = _.collect = function (obj, iteraee, context) {
    iteraee = cd(iteraee, context);
    var keys = !isArrayLike(obj) && _keys(obj),
      length = (keys || obj).length,
      result = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] == iteraee(obj[currentKey], currentKey, obj);
    }
    return results;
  }




function collectionNonEnumPorps(obj,keys){
  var nonEnumIdx = nonEUmerableProps.length;
  var constructor = obj.constructor;
  var popto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

  var prop = 'constructor';
  if(_.has(obj,prop) && !_.contains(keys,prop))
  keys.push(prop);

  while(nonEnumIdx--){
    prop = nonEUmerableProps[nonEnumIdx];
    if(prop in obj && obj[prop] !== proto[prop] && !_.contains(keys,prop)) {
      keys.push(prop);
    }
  }
}

//927行
_.keys = function(obj){
  if(!_.isObject(obj)) return [];
  if(nativeKeys) return nativeKeys(obj);
  var keys = [];
  for(var key in obj) if(_.has(obj,key))
  keys.push(key);

  if(hasEnumBug) collectNonEnumProps(obj,keys);
  return keys;
}















//1471行
  //创建一个函数,用来支持链式调用
  _.chain = function (obj) {
    var instance = _(obj);
    //是否支持链式操作
    instance._chain = true;
    return instance;
  }
  //返回_.chain里是否调用的结果, 如果为true, 则返回一个被包装的Underscore对象, 否则返回对象本身
  var result = function (instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // 用于扩展underscore对象自身接口的函数
  _.mixin = function (obj) {
    //通过循环遍历对象来浅拷贝对象的属性
    _.each(_.functions(obj), function (name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function () {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      }
    })
  }

  _.mixin(_);

  //添加所有的数组写入方法到包装器
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
    var method = ArrayProto[name];
    _.prototype[name] = function () {
      var obj = this._wrapped;
      methord.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    }
  })
  //添加所有的数组取值方法到包装器
  _.each(['concat', 'join', 'slice'], function (name) {
    var method = ArrayProto[name];
    _.prototype[name] = function () {
      return result(this, method.apply(this._wrapped, arguments));
    }
  })

  //返回被封装的Underscore对象的原始值(存放在_   )
  _.prototype.value = function () {
    return this._wrapped;
  }
  //为引擎操作中使用的某些方法提供解包代理
  //如算数和json字符串
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function () {
    return '' + this._wrapped;
  }


  //对AMD支持的一些处理
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function () {
      return _;
    })
  }





























































}.call(this))
//整个函数在一个闭包中，避免污染全局变量。通过传入this（其实就是window对象）来改变函数的作用域