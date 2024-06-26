## JavaScript Snippets

1. 按优先级带出信息

```js
/*
  * 带出信息优先级排序：
  - url 中的applicantId 优先级最高
  - url中的 policyId 优先级其次
  - app 环境
  - wap 环境
  - url 中的 memberId, memberToken
  - 微信环境parameter
*/
// 获取用户脱敏信息
function getCustoMerData(memberId = '', memberToken = '') {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: 'yanyue404',
        age: '27'
      })
    }, 1000)
  })
}
const channels = []
/**
 * 添加一种获取用户信息的方法, 获取的优先级，根据添加的顺序，越往后优先级越低
 * @param {Function} params 返回 Objece 标识可用值，其它不可用
 * @param {Function} model 返回Promise
 * Promise value 的格式
 */
function addUserChannel(params, model, format) {
  channels.push({
    params,
    model,
    format
  })
}
function isObject(value) {
  var type = typeof value
  return value != null && (type == 'object' || type == 'function')
}
async function getCustoMerInfo() {
  for (let { params, model, format } of channels) {
    let data = await params()
    if (isObject(data)) {
      let ret = await model(data)
      return isObject(ret) && format ? format(ret) : ret
    }
  }
}

// url 中的applicantId 优先级最高
addUserChannel(
  function() {
    let { applicationId, applicationToken } = window.urlParams || {}
    return (
      applicationId &&
      applicationToken && {
        applicationId,
        applicationToken
      }
    )
  },
  function(params) {}
)

// 这个优先级最后
// url 中的 memberId, memberToken
addUserChannel(
  function() {
    let { memberId = 'admin', memberToken = '123456' } = window.urlParams || {}
    return (
      memberId &&
      memberToken && {
        memberId,
        memberToken
      }
    )
  },
  function(param) {
    return getCustoMerData(param.memberId, param.memberToken)
  }
)
getCustoMerInfo().then(user => {
  console.log('获取用户信息：', user)
})
```

2. getObjectItemByAge

```js
/**
 *
 * @export 一个以对象为键的缓存方法，用来返回命中的对象组合结果
 * @param {object} key 年龄关系键值对 {"0-3": '001'}
 * @param {age} [sting]
 * @return {any} 命中的 value 值
 */
export function getObjectItemByAge(obj, age) {
  const keys = Object.keys(obj)
  let result = ''
  keys.forEach(item => {
    let [age1, age2] = item.split('-')
    if (age2 === undefined) {
      throw new Error('[Error]: 键的表示方式必须为 A-B 形式')
    }
    if (Number(age1) <= Number(age) && Number(age2) >= Number(age)) {
      result = obj[item]
    }
  })
  return result
}
```

2. 初始化 SDK

加载 js

```js
//加载js
function loadJs(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = 'async'

    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          resolve()
        }
      }
    } else {
      script.onload = function() {
        resolve()
      }
    }
    script.onerror = function() {
      reject()
    }
    script.src = url
    document.head.appendChild(script)
  })
}
function initTD() {
  td_src = location.protocol + '//xxx-sdk.js'
  tdLoaded = function(cb) {
    if (window.TDAPP && window.TDAPP.send) {
      cb && typeof cb == 'function' && cb()
    } else {
      loadJs(td_src, true, function() {
        cb && typeof cb == 'function' && cb()
      })
    }
  }
}
initTD()
```

初始化完毕

```js
let RETRY_NUM = 30 // 重试次数，每100ms重试1次
let cur_retry_num = 0
let isInited = false
let inited = Promise.resolve()
// 浏览器环境，添加TDAPP初始化等待操作
inited = Promise.all([
  inited,
  new Promise(resolve => {
    ;(function judgeTDinit() {
      if (window.TDAPP || cur_retry_num++ >= RETRY_NUM) {
        resolve()
      } else {
        setTimeout(judgeTDinit, 100)
      }
    })()
  })
])

inited.then(() => {
  isInited = true
  alert('初始化好了')
})
```

3. 异步错误重试

```js
const p = () =>
  new Promise(resolve =>
    setTimeout(() => {
      let a = Math.random()
      let flag = a > 0.1 ? 0 : 1
      console.log('=====', flag)
      resolve(flag)
    }, 1000)
  )

function tryPromise(all = 3000, delay = 500, asyncFn = undefined, shouldFn = function() {}) {
  let cur_retry_num = 0 // 重试次数
  return new Promise(resolve => {
    ;(async function main() {
      // 异步反应
      let task = asyncFn()
      let res = await task
      if (shouldFn(res) || cur_retry_num++ >= all / delay) {
        resolve()
      } else {
        setTimeout(main, delay)
      }
    })()
  })
}

tryPromise(3000, 500, p, res => res === 1).then(() => {
  console.log('okkk')
})
```
