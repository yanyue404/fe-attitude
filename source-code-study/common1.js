function swipebanner(container, options) {
  var defaultoptions = {
      slidesPerView: 1,//显示多少个滑块
      sildenumber: 1,//一次移去多少个滑块
      speed: 300,//移动速度
      startSlide: 0//初始显示的滑块
  }
  options.slidesPerView = options.slidesPerView || defaultoptions.slidesPerView;
  options.sildenumber = options.sildenumber || defaultoptions.sildenumber;
  options.speed = options.speed || defaultoptions.speed;
  options.startSlide = options.startSlide || defaultoptions.startSlide;

  var element = container[0].children[0],
  width = element.children[0].offsetWidth,
  length = element.children.length,
  sildeindex = options.startSlide
  len = length - options.slidesPerView;
  element.style.width = width * length + "px";
  element.style.left = "-" + width * sildeindex + "px";
  function move(index) {
      switch (index) {
          case "prev": sildeindex -= options.sildenumber; if (sildeindex < 0) { sildeindex = 0; }; break;
          case "next": sildeindex += options.sildenumber; if (sildeindex > len) { sildeindex = len; }; break;
          default: sildeindex = index; if (sildeindex < 0) { sildeindex = 0; }; if (sildeindex > len) { sildeindex = len; }; break;
      }
      $(element).animate({ left: "-" + width * sildeindex + "px" }, options.speed);
  }
  if (options.prev)
      $(options.prev).on('click', function (e) {
          move("prev");
      })

  if (options.next)
      $(options.next).on('click', function (e) {
          move("next");
      })

  return {
      prev: function () {
          move("prev");
      },
      slide: function (index) {
          move(index);
      },
      next: function () {
          move("next");
      },
      len: len,
      length: length
  };
}
//历史头部