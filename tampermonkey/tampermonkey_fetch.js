// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://127.0.0.1:5500/test/fetch.html
// @grant        unsafeWindow
// ==/UserScript==

;(function() {
  'use strict'
  // Your code here...
  console.log(window.unsafeWindow)
  const dom = document.createElement('div')
  dom.innerText = '我是油猴脚本的文本'
  document.getElementsByTagName('body')[0].append(dom)

  const originFetch = fetch
  console.log(originFetch)
  window.unsafeWindow.fetch = (url, options) => {
    return originFetch(url, options).then(async response => {
      console.log('Req url:', url)
      if (url === 'http://localhost:3006/records') {
        const responseClone = response.clone()
        let res = await responseClone.json()
        res.forEach(v => (v.title = '学习'))
        const responseNew = new Response(JSON.stringify(res), response)
        return responseNew
      } else {
        return response
      }
    })
  }
})()
