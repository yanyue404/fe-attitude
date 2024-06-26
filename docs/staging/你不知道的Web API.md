## postMessage：H5 与 App 交互

H5 调 APP

1. 由 APP 向 H5 注入一个全局 js 对象，然后在 H5 直接访问这个对象，如 **JSBridge**
2. window 后面接的方法必须使用 APP 定义好的监听方法，如：**postMessage**
3. 监听方法 **postMessage** 后面接具体逻辑调用的方法或直接传参 （参数必须和 APP 那边确定好，两边保持一致性，无论是参数个数还是参数类型）
4. 向 app 发送指令，当 app 处理完指令后一般会回调全局约定好的回调方法。通过这种形式与 app 进行交互

```js
AppBridgeProvider.getUserInfo((data) => {});
```

APP 调 H5

在 **H5** 这边实现要在全局 **window** 上定义好 **APP** 要回调的方法

```js
var AppBridgeProvider;
(function () {
  AppBridgeProvider = {
    mCallback: null,
    userInfo: null,
    location: {
      longitude: "",
      latitude: "",
    },
    /**
     * 向app发送指令，当app处理完指令后一般会回调本js的 fromApp()方法。通过这种形式与app进行交互
     * @param msg   指令（json对象）
     */
    postMessage(msg) {
      console.log("action:", JSON.stringify(msg));
      if (!this.isInApp()) {
        console.warn("异常提示：请在 App 内使用！");
        return; //为防止在非app环境下调用，如果发现不是app环境，则结束代码
      }
      try {
        let plat =
          window.navigator.platform.toLowerCase() || window.navigator.platform;
        if (plat == "iphone" || plat == "iPhone") {
          window.webkit.messageHandlers.iphone.postMessage(msg);
        } else {
          window.android.postMessage(msg);
        }
      } catch (err) {
        console.log(err);
      }
    },
    getUserInfo(callback) {
      let timeStamp = "" + new Date().getTime(); //时间戳
      //将回调函数添加到回调池中
      this.mCallback_userInfo.push({
        callback: callback ? callback : null,
        timeStamp: timeStamp,
      });
      let json = {
        action: "userInfo",
        jsMethod: timeStamp,
      }; // 此处将jsMethod字段作为时间戳使用，用来处理调用者的并发请求(只有时间戳传递的和回调的相同, 才执行callback)
      this.postMessage(json);
    },
    /**
     * 获取定位信息
     * @param callback  回调方法
     * @param options   可选入参（json对象）
     */
    getLocation(options, callback) {
      this.mCallback = callback;
      let json = {
        action: "getLocation",
        ...options,
      };
      this.postMessage(json);
    },
  };
})();

// 这里的 action 和 msg 都是原生那边传过来的
function fromApp(action, msg) {
  let mCallback = AppBridgeProvider.mCallback;
  let iJson = null; //这个json是msg转换后的json对象
  switch (action) {
    case "userInfo":
      iJson = eval("(" + msg + ")"); //转化为json对象
      AppPublicProvider.userInfo = iJson.userInfo; //变为全局变量
      if (
        AppPublicProvider.mCallback_userInfo &&
        AppPublicProvider.mCallback_userInfo.length > 0
      ) {
        for (let i = 0; i < AppPublicProvider.mCallback_userInfo.length; i++) {
          if (
            AppPublicProvider.mCallback_userInfo[i].callback &&
            iJson &&
            iJson.jsMethod &&
            AppPublicProvider.mCallback_userInfo[i].timeStamp === iJson.jsMethod
          ) {
            AppPublicProvider.mCallback_userInfo[i].callback(iJson.userInfo); //执行回调方法 以前这个回调是没有参数的, 现在把拿到的userInfo传递过去
            AppPublicProvider.mCallback_userInfo.splice(i, 1); //将该位置上的元素移除
          }
        }
      }
      break;
    case "getLocation": //获取定位信息
      iJson = eval("(" + msg + ")"); //转化为json对象
      AppPublicProvider.location = iJson; //变为全局变量
      mCallback && mCallback();
      break;
  }
}
// h5 定义 APP 调用的方法必须时 window 全局下的，否则 APP 调用不到
window.fromApp = fromApp;
```


## navigator.sendBeacon: 页面关闭时，前端上传监控数据

通过 HTTP POST 请求，将少量数据使用异步的方式，发送到服务端。

```js
function reportEvent() {
  const url = "http://api.wangxiaokai.vip/test";
  const data = JSON.stringify({
    time: performance.now(),
  });

  navigator.sendBeacon(url, data);
}

document.addEventListener("visibilitychange", function () {
  if (document.visiblityState === "hidden") {
    reportEvent();
  }
});
```

**发送的时机**

浏览器端自动判断合适的时机进行发送

**是否会产生阻塞或影响页面性能**

不会产生阻塞，影响当前页面的卸载。
不影响下个新页面的加载，不存在性能问题。
另外，数据传输可靠。

**语法**

```js
navigator.sendBeacon(url, data);
```

**参数解析**

- url：接收请求的网络地址
- data：请求中携带的数据，数据格式可选：ArrayBuffer，ArrayBufferView，Blob，DomString，FormData，URLSearchParams

**返回值**

当浏览器将数据成功加入传输队列时，sendBeacon 方法会返回 true，否则返回 false。

> 注意返回值的时机：成功加入传输队列，而不是服务端的处理成功后的返回。

**缺点**

- 只能发起 POST 请求
- 无法自定义请求头参数
- 数据大小有限制 （Chrome 限制大小为 64kb）
- 只能在 window 事件 visibilitychange 和 beforeunload 中使用，其他事件中回调，会丢失数据。

## 参考链接

- [H5 与 APP 交互！](https://juejin.cn/post/6844903587697393677)
- [h5 与原生 app 交互的原理](https://segmentfault.com/a/1190000016759517)
