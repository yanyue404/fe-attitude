// ==UserScript==
// @name         Customize your website style
// @namespace    http://tampermonkey.net/
// @version      2024-07-24
// @description  try to take over the world!
// @author       yanyue404
// @match        https://chinadigitaltimes.net/*
// @match        https://golden-axe.vercel.app/*
// @match        https://yanyue404.github.io/*
// @match        https://developer.mozilla.org/*
// @match        *://*.feishu.cn/*
// @include      /https:\/\/gitlab.(.*?){2}.com\/((\w|-)+\/){2,3}/
// @match        *://link.juejin.cn/*
// @match        *://*.csdn.net/*
// @grant        GM_addStyle
// @run-at       document-start
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.4.1/jquery.min.js
/* globals jQuery, $, waitForKeyElements */
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.hellofont.cn
// ==/UserScript==
;(function() {
  'use strict'

  let url = window.location.href
  let pathname = location.pathname

  // github.com 的 字体

  if (/chinadigitaltimes|golden-axe|yanyue404\.github|developer\.mozilla/.test(url)) {
    const globol_font_style = `
    * { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important
     }
  `
    GM_addStyle(globol_font_style)
  }

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

  // 掘金跳转链接直达，自动跳转链接的中间页面
  if (/link\.juejin/.test(url)) {
    const result = new URL(url).searchParams.get('target')
    if (result) {
      location.href = decodeURIComponent(result)
    }
  }

  // CSDN 可复制文本
  if (/csdn\.net/.test(url)) {
    $(document).ready(function() {
      ;(function openCopy() {
        const $$ = (Selector, el) => (el || document).querySelectorAll(Selector)
        $$(
          'pre, code, div, p, span,a,i, strong,article, h1,h2,h3,h4,h5,h6, table, caption, tbody, tfoot, thead, tr, th, td'
        ).forEach(el => {
          // 样式可选
          ;[
            'user-select',
            '-webkit-user-select',
            '-moz-user-select',
            '-ms-user-select',
            '-khtml-user-select',
            'pointer-events'
          ].forEach(prop => el.style.setProperty(prop, 'unset', 'important'))
          // 事件可选
          ;[
            'onselect',
            'onselectstart',
            'onselectionchange',
            'oncopy',
            'onbeforecopy',
            'onpaste',
            'onbeforepaste'
          ].forEach(xcanwin => {
            el[xcanwin] = e => {
              // 处理能影响文本的事件
              e.stopImmediatePropagation()
            }
          })
        })
      })()
    })
  }
})()
