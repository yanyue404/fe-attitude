var loadMore = {
  init: function (options) {
    var y = this;

    var defaultOptions = {
      ele: ''
    }
    y.options = Object.assign({}, defaultOptions, options);
    var domStr = y.options.ele;
    y.checkOptions().appendById(domStr);

    console.log(this)

  },
  checkOptions: function () {
    if (!this.options.ele) {
      throw new Error("element is required");
    }
    return this;
  },
  makeBtnLayout: function () {
    var box = document.createElement("div");
    box.id = "loadMore";
    box.className = "text-center";
    box.innerHTML = '<ul class="pager">'
      + '<li id="btn-load-more" class="">'
      + '<a href="javascript:;">点击载入更多</a></li>'

      + '<li id="btn-loading" class="hidde">'
      + '<a href="javascript:;">'
      + '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> 载入中</a> </li>'
      + '</ul>';

    return box;
  },
  appendById: function (id) {
    var y = this;
    var box = y.makeBtnLayout();
    document.getElementById(id).appendChild(box);
  }
}