/**
 * JS Bridge SDK for native app communication
 */

class JsBridge {
  constructor() {
    // 初始化回调函数存储
    this.callbacks = new Map()
    this.callbackId = 0

    // 注册来自 App 的回调处理
    window.fromApp = this.handleAppCallback.bind(this)
  }

  /**
   * 发送消息到原生 App
   * @param {string} action - 动作名称
   * @param {object} params - 参数对象
   * @returns {Promise}
   */
  postMessage(action, params = {}) {
    return new Promise((resolve, reject) => {
      const callbackId = this.generateCallbackId()

      // 存储回调函数
      this.callbacks.set(callbackId, {
        success: resolve,
        fail: reject
      })

      const message = {
        action,
        params,
        callbackId
      }

      // 为了测试方便，存储消息对象到全局变量
      window.globalMessage = message // 添加这行用于测试

      // 判断平台分别调用
      if (this.isIOS()) {
        window.webkit.messageHandlers.nativeApp.postMessage(message)
      } else if (this.isAndroid()) {
        window.nativeApp.postMessage(JSON.stringify(message))
      }
    })
  }

  /**
   * 处理来自 App 的回调
   * @param {string} callbackId - 回调 ID
   * @param {object} result - 回调结果
   */
  handleAppCallback(callbackId, result) {
    const callback = this.callbacks.get(callbackId)
    if (!callback) return
    if (result.code === 0) {
      callback.success(result.data)
    } else {
      callback.fail(result.message || '操作失败')
    }

    // 清理回调
    this.callbacks.delete(callbackId)
  }

  /**
   * 生成回调 ID
   */
  generateCallbackId() {
    return `cb_${this.callbackId++}_${Date.now()}`
  }

  /**
   * 判断是否是 iOS
   */
  isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  }

  /**
   * 判断是否是 Android
   */
  isAndroid() {
    return /Android/i.test(navigator.userAgent)
  }

  /**
   * 获取用户信息
   * @returns {Promise<object>} 用户信息
   */
  getUserInfo() {
    return this.postMessage('getUserInfo')
  }

  /**
   * 设置分享信息
   * @param {object} shareInfo - 分享信息
   * @param {string} shareInfo.title - 分享标题
   * @param {string} shareInfo.desc - 分享描述
   * @param {string} shareInfo.link - 分享链接
   * @param {string} shareInfo.imgUrl - 分享图片
   * @returns {Promise}
   */
  setShareInfo(shareInfo) {
    return this.postMessage('setShareInfo', shareInfo)
  }
}

// 导出单例
const jsBridge = new JsBridge()

window.jsBridge = jsBridge
