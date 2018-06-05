class FullPage {
  constructor(options) {
    let defaultOptions = {
      element: '',
      duration: '1s',
    }
    this.currentIndex = 0
    this.options = Object.assign({}, defaultOptions, options)
    this.animating = false
    this.checkOptions().initHtml().bindEvents()
  }

  checkOptions() {
    if (!this.options.element) {
      throw new Error('element is required')
    }
    return this
  }
  initHtml() {
    this.options.element.style.overflow = 'hidden'
    dom.every(this.options.element.children, section => {
      section.style.transition = `transform ${this.options.duration}`  // 设置过渡时间
    })
    return this
  }
  bindEvents() {
    this.options.element.addEventListener('wheel', e => {
      let targetIndex = this.currentIndex + (e.deltaY > 0 ? 1 : -1)
      this.goToSection(targetIndex).then(
        // resolve (success)
        () => {
          this.currentIndex = targetIndex // 选中的等于目标    
        },
        // reject (false)
        () => { }
      )
    })
    return this
    
  }

  goToSection(targetIndex) {
    return new Promise((resolve, reject) => {
      if (this.animating) {
        reject()
      } else if (targetIndex < 0) {
        reject()
      } else if (targetIndex >= this.options.element.children.length) {
        reject()
      } else {
        this.animating = true
        let that = this
        this.options.element.children[0].addEventListener('transitionend', function callback() {
          this.removeEventListener('transitionend', callback)
          that.animating = false
          resolve()
        })
        dom.every(this.options.element.children, section => {
          section.style.transform = `translateY(-${100 * targetIndex}%)`  // 滚动
        })
      }
    })
  }
}