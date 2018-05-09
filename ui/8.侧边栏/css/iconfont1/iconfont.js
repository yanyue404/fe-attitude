;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xiaoxi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M61.412828 229.284111C61.412828 209.9115 77.347634 194.206897 96.839684 194.206897L944.054936 194.206897C963.620649 194.206897 979.481794 209.918103 979.481794 229.284111L979.481794 794.715888C979.481794 814.088499 963.546988 829.793103 944.054936 829.793103L96.839684 829.793103C77.273972 829.793103 61.412828 814.081896 61.412828 794.715888L61.412828 229.284111ZM222.33117 402.419603 504.813928 541.902361 520.447311 549.621725 536.080695 541.902361 818.563453 402.419603C836.04933 393.785524 843.22513 372.611114 834.591052 355.125237 825.956973 337.63936 804.782564 330.46356 787.296687 339.097638L504.813928 478.580397 536.080695 478.580397 253.597935 339.097638C236.112058 330.46356 214.937649 337.63936 206.30357 355.125237 197.669491 372.611114 204.845292 393.785524 222.33117 402.419603Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-dingdan" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M768.021 90.128h-90.659c-4.951-0.396-414.399 0-414.399 0-45.512 0-82.748 37.237-82.748 82.748v298.726c0 0.037-0.001 379.581-0.001 379.581 0 45.512 37.238 82.748 82.748 82.748l399.399 0.115c103.625 0 188.409-84.785 188.409-188.409v-572.762c0-45.513-37.238-82.748-82.748-82.748zM754.070 708.138c0 6.332-5.181 11.512-11.512 11.512h-454.135c-6.332 0-11.513-5.181-11.513-11.512v-47.613c0-6.332 5.181-11.512 11.513-11.512h454.135c6.332 0 11.512 5.181 11.512 11.512v47.613zM754.070 516.071c0 6.332-5.181 11.512-11.512 11.512h-454.135c-6.332 0-11.513-5.181-11.513-11.512v-47.613c0-6.332 5.181-11.513 11.513-11.513h454.135c6.332 0 11.512 5.181 11.512 11.513v47.613zM754.070 324.002c0 6.332-5.181 11.513-11.512 11.513h-454.135c-6.332 0-11.513-5.181-11.513-11.513v-47.613c0-6.332 5.181-11.513 11.513-11.513h454.135c6.332 0 11.512 5.181 11.512 11.513v47.613z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)