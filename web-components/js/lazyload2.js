function checkImgs() {
  var imgs = Array.from(document.getElementsByTagName('img'));
  imgs.forEach((v, index) => {
    io.observe(v);
  })
}

function loadImgs(ele) {
  if (!ele.src) {
    var source = ele.dataset.src;
    ele.src = source;
  }
}

const io = new IntersectionObserver(ioes => {
  ioes.forEach(ioe => {
    const el = ioe.target;
    const intersectionRatio = ioe.intersectionRatio;
    if (intersectionRatio > 0 && intersectionRatio <= 1) {
      loadImgs(el);
    }
    el.onload = el.onerror = () => io.unobserve(el);
  });
});
