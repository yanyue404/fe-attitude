// ==UserScript==
// @name         Customize your website style
// @namespace    http://tampermonkey.net/
// @version      2024-07-24
// @description  try to take over the world!
// @author       yanyue404
// @match        https://chinadigitaltimes.net/*
// @match        https://golden-axe.vercel.app/*
// @match        https://yanyue404.github.io/*
// @grant        GM_addStyle
// @run-at       document-start
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.hellofont.cn
// ==/UserScript==

;(function() {
  'use strict'
  // github.com 的 字体

  const style_pc = `
      * { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji" !important
       }
    `
  GM_addStyle(style_pc)
})()
