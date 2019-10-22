class AnimateToNum {
  constructor(options) {
    this.options = options;
  }
  toNum(newNum) {
    var gap = this.options.initNum - newNum;
    var step = this.options.animTime / gap;
  }
}

var numAnim = new AnimateToNum({
  animTime: 2000, //每次数字变动持续的时间（ms），
  initNum: 500, //初始化的数字
  onChange: function(num) {
    console.log(num);
  }
});

numAnim.toNum(100);
