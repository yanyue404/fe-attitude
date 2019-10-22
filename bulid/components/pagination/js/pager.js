(function () {
  var util = {
    on: function (element, eventType, selector, fn) {
      element.addEventListener(eventType, e => {
        var el = e.target;
        while (!el.matches(selector)) {
          if (element === el) {
            el = null;
            break;
          }
          el = el.parentNode;
        }
        el && fn.call(el, e, el);
      });
      return element;
    },
    // http://stackoverflow.com/a/35385518/1262580
    create: function (html, children) {
      var template = document.createElement("template");
      template.innerHTML = html.trim();
      var node = template.content.firstChild;
      if (children) {
        dom.append(node, children);
      }
      return node;
    },
    dispatchEvent: function (element, eventType, detail) {
      var event = new CustomEvent(eventType, {
        detail
      })
      element.dispatchEvent(event)
      return this
    },

    queryString: {
      get: function (name) {
        var getAll = searchString => {
          var query = searchString.replace(/^\?/, '');
          var queryObject = {};
          var queryArray = query.split('&').filter(i => i).forEach((string, index) => {
            var parts = string.split('=');
            queryObject[parts[0]] = decodeURIComponent(parts[1]);
          });
          return queryObject;
        }
        if (arguments.length === 0) {
          return getAll(location.search);
        } else {
          return getAll(location.search)[name];
        }
      },
      set: function (name, value) {
        var set = (search, name, value) => {
          var regex = new RegExp(`(${encodeURIComponent(name)})=([^&]*)`, '');
          if (regex.test(search)) {
            return search.replace(regex, (match, c1, c2) => `${c1}=${encodeURIComponent(value)}`);
          } else {
            return search.replace(/&?$/, `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
          }
        }
        if (arguments.length === 1 && typeof name === 'object' && name !== null) {
          var search = location.search;
          for (var key in arguments[0]) {
            search = set(search, key, arguments[0][key])
          }
          location.search = search;
        } else {
          location.search = set(location.search, name, value);
        }
      },
    },
  };

  function Pager(options) {
    var defaultOptions = {
      element: null,
      buttonCount: 5,
      currentPage: 1,
      totalPage: 1,
      pageQuery: '', // 'page'
      templates: {
        number: '<span>%page%</span>',
        prev: '<button class=prev>上一页</button>',
        next: '<button class=next>下一页</button>',
        first: '<button class=first>首页</button>',
        last: '<button class=last>末页</button>',
      },
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.domRefs = {};
    this.currentPage = parseInt(this.options.currentPage, 10) || 1;
    this.init();
  }

  Pager.prototype = {
    constructor: Pager,
    init: function () {
      this.checkOptions().initHtml().bindEvents();
    },
    checkOptions: function () {
      if (!this.options.element) {
        throw new Error('element is required');
      }
      return this;
    },
    bindEvents: function () {
      util.on(this.options.element, 'click', 'ol[data-role="pageNumbers"]>li', (e, el) => {
        this.goToPage(parseInt(el.dataset.page, 10));
      });
      this.domRefs.first.addEventListener('click', () => {
        this.goToPage(1);
      });
      this.domRefs.last.addEventListener('click', () => {
        this.goToPage(this.options.totalPage);
      });
      this.domRefs.prev.addEventListener('click', () => {
        this.goToPage(this.currentPage - 1);
      });
      this.domRefs.next.addEventListener('click', () => {
        this.goToPage(this.currentPage + 1);
      });
    },

    goToPage: function (page) {
      if (!page || page > this.options.totalPage || page === this.currentPage) {
        return;
      }
      if (this.options.pageQuery) {
        util.queryString.set(this.options.pageQuery, page);
      }
      this.currentPage = page;

      util.dispatchEvent(this.options.element, 'pageChange', {
        "page": page
      });
      this.rerender();
    },
    rerender: function () {
      this._checkButtons();
      var newNumbers = this._createNumbers();
      var oldNumbers = this.domRefs.numbers;
      oldNumbers.parentNode.replaceChild(newNumbers, oldNumbers);
      this.domRefs.numbers = newNumbers;
    },
    initHtml: function () {
      var pager = (this.domRefs.pager = document.createElement('nav'));
      this.domRefs.first = util.create(this.options.templates.first);
      this.domRefs.prev = util.create(this.options.templates.prev);
      this.domRefs.next = util.create(this.options.templates.next);
      this.domRefs.last = util.create(this.options.templates.last);
      this._checkButtons();
      this.domRefs.numbers = this._createNumbers();
      pager.appendChild(this.domRefs.first);
      pager.appendChild(this.domRefs.prev);
      pager.appendChild(this.domRefs.numbers);
      pager.appendChild(this.domRefs.next);
      pager.appendChild(this.domRefs.last);
      this.options.element.appendChild(pager);
      return this;
    },
    _checkButtons: function () {
      if (this.currentPage === 1) {
        this.domRefs.first.setAttribute('disabled', '');
        this.domRefs.prev.setAttribute('disabled', '');
      } else {
        this.domRefs.first.removeAttribute('disabled');
        this.domRefs.prev.removeAttribute('disabled');
      }
      if (this.currentPage === this.options.totalPage) {
        this.domRefs.next.setAttribute('disabled', '');
        this.domRefs.last.setAttribute('disabled', '');
      } else {
        this.domRefs.next.removeAttribute('disabled');
        this.domRefs.last.removeAttribute('disabled');
      }
    },
    _createNumbers: function () {
      var currentPage = this.currentPage;
      var {
        buttonCount,
        totalPage
      } = this.options;
      var start1 = Math.max(currentPage - Math.round(buttonCount / 2), 1);
      var end1 = Math.min(start1 + buttonCount - 1, totalPage);
      var end2 = Math.min(currentPage + Math.round(buttonCount / 2) - 1, totalPage);
      var start2 = Math.max(end2 - buttonCount + 1, 1);
      var start = Math.min(start1, start2);
      var end = Math.max(end1, end2);

      var ol = util.create('<ol data-role="pageNumbers"></ol>');
      var numbers = [];
      for (var i = start; i <= end; i++) {
        var li = util.create(`<li data-page="${i}">${this.options.templates.number.replace('%page%', i)}</li>`);
        if (i === currentPage) {
          li.classList.add('current');
        }
        ol.appendChild(li);
      }
      return ol;
    }
  };
  window.Pager = Pager;
})();