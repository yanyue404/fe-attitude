class Tabs {
  constructor(options) {
    const defaultOptions = {
      element: "",
      navSelector: '[data-role="tabs-nav"]',
      paneSelector: '[data-role="tabs-panes"]',
      activeClassName: "active"
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.checkOptions()
      .bindEvents()
      .setDefaultTab();
  }

  checkOptions() {
    if (!this.options.element) {
      throw new Error("element is required");
    }
    return this;
  }

  bindEvents() {
    dom.on(
      this.options.element,
      "click",
      `${this.options.navSelector}>li`,
      (e, el) => {
        const index = dom.index(el);
        const children = this.options.element.querySelector(
          this.options.paneSelector
        ).children;

        dom.uniqueClass(el, this.options.activeClassName);
        dom.uniqueClass(children[index], this.options.activeClassName);
      }
    );
    return this;
  }
  setDefaultTab() {
    this.options.element
      .querySelector(`${this.options.navSelector}>li:first-child`)
      .click();
    return this;
  }
}
