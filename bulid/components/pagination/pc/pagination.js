var Pagination = function(selector, options) {
  var defaults = {
    total: 0,
    pageSize: 10,
    current: 0,
    onChange: function() {}
  }

  var target = document.querySelector(selector)
  this.container = document.createElement('div')
  this.container.classList.add('pagination')
  target.appendChild(this.container)

  this.options = Object.assign({}, defaults, options)
  this.listen()
  this.render()
}

Pagination.prototype.listen = function() {
  this.container.addEventListener('click', function(e) {
    if (e.target.classList.contains('num')) {
      var page = parseInt(e.target.dataset.page)

      if (page !== this.options.current) {
        this.options.current = page
        this.render()
      }
    }

    if (e.target.classList.contains('prev')) {
      this.options.current -= 1
      this.render()
    }

    if (e.target.classList.contains('next')) {
      this.options.current += 1
      this.render()
    }
  }.bind(this))
}

Pagination.prototype.render = function() {
  var current = this.options.current
  var pages = Math.ceil(this.options.total / this.options.pageSize)
  var limit = 9

  if (current < 0 || current > pages || pages < 2) return

  this.options.onChange && this.options.onChange(current)

  var showPrevMore = pages > limit && this.options.current > limit - Math.floor(limit / 2)
  var showNextMore = pages > limit && this.options.current < pages - Math.ceil(limit / 2)

  var start = 0
  var end = 0

  if (showPrevMore && !showNextMore) {
    start = pages - (limit - 2)
    end = pages
  } else if (!showPrevMore && showNextMore) {
    start = 2
    end = limit
  } else if (showPrevMore && showNextMore) {
    var offset = Math.floor(limit / 2) - 1
    start = current - offset
    end = current + offset + 1
  } else {
    start = 2
    end = pages
  }

  var html = []

  html.push('<ul>')
  current > 1 && html.push('<li class="btn prev">上一页</li>')
  html.push('<li class="btn num ' + (current === 1 ? 'active' : '') + '" data-page="1">1</li>')
  showPrevMore && html.push('<li class="more">...</li>')

  for (var i = start; i < end; i++) {
    html.push('<li class="btn num ' + (current === i ? 'active' : '') + '" data-page="' + i + '">' + i + '</li>')
  }

  showNextMore && html.push('<li class="more">...</li>')
  html.push('<li class="btn num ' + (current === pages ? 'active' : '') + '" data-page="' + pages + '">' + pages + '</li>')
  current < pages && html.push('<li class="btn next">下一页</li>')
  html.push('</ul>')

  this.container.innerHTML = html.join('')
}
