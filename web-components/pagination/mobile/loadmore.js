function loadMore(page, fn) {
  var loadComplete = true

  function listenScroll() {
    if (document.body.scrollTop + window.innerHeight > document.body.offsetHeight - 10 && loadComplete) {
      loadComplete = false
      
      fn && fn(page, function() {
        page += 1
        loadComplete = true
      })
    }
  }

  listenScroll()
  window.addEventListener('scroll', listenScroll)
}