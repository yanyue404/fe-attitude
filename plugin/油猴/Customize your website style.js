// ==UserScript==
// @name         Customize your website style
// @namespace    http://tampermonkey.net/
// @version      2024-07-24
// @description  try to take over the world!
// @author       yanyue404
// @match        https://chinadigitaltimes.net/*
// @match        https://golden-axe.vercel.app/*
// @match        https://yanyue404.github.io/*
// @match        *://*.feishu.cn/*
// @include        /https:\/\/gitlab.(.*?){2}.com\/((\w|-)+\/){2,3}/
// @grant        GM_addStyle
// @run-at       document-start
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js
/* globals jQuery, $, waitForKeyElements */
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.hellofont.cn
// ==/UserScript==

;(function() {
  'use strict'
  // github.com 的 字体

  const style_pc = `
      * { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important
       }
     code, code span, code a {
      font-family: "JetBrains Mono","Menlo","DejaVu Sans Mono","Liberation Mono","Consolas","Ubuntu Mono","Courier New","andale mono","lucida console",monospace  !important
       }
    `

  GM_addStyle(style_pc)

  let url = window.location.href
  let pathname = location.pathname

  // 飞书背景护眼
  if (/\.feishu\.cn/.test(url)) {
    // 背景色护眼模式
    GM_addStyle(
      'html,body, .ssrWaterMark,.ssrHiddenWaterMark, #mainBox, .app, .suite-body,  .navigation-bar.navigation-bar__suite, .doc-comment-v2,.catalogue__list {background-color: #C7EDCC !important} .section-nav-container .full-entry-title { background: none !important}'
    )

    // watermark 移除
    GM_addStyle('.suite-clear { display: none !important}')
  }

  // gitlab 优化, 主页 master 分支需要 history 按钮
  if (/\gitlab\./.test(url)) {
    $(document).ready(function() {
      let allText = Array.from(Array.from($('.tree-controls .d-block'))[0].children).map(v => v.innerText)
      // History 按钮只创建一个
      if (!allText.includes('History')) {
        $('.tree-controls .d-block').prepend(
          `<a class="gl-button btn btn-md btn-default shortcuts-find-file" rel="nofollow" href="${pathname}/-/commits/master/"><span class="gl-button-text">History</span></a>`
        )
      }
    })
  }
})()
