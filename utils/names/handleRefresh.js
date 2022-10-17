let isIos = () => {
  let browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/
  return browserRule.test(navigator.userAgent)
}

// 当ios后退刷新时
export async function whenIosBack(callback) {
  if (isIos()) {
    window.onpageshow = event => {
      if (event.persisted) {
        callback()
      }
    }
    return true
  }
  return false
}

export function handleRefresh(callback) {
  if (!whenIosBack(callback)) {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !document.webkitHidden && !document.mozHidden) {
        callback()
      }
    })
  }
}
