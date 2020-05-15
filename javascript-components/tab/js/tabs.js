class Tabs {
  constructor(options) {
    const defaultOptions = {
      element: '',
    };
    this.options = Object.assign({}, defaultOptions, options);
    this.checkOptions();
    this.$wrapper = options.element;
    this.initTabs();
    this.setTabs();
    this.bindTabs();
  }
  checkOptions() {
    if (!this.options.element) {
      throw new Error('element is required');
    }
  }

  initTabs() {
    const $tabPanels = [...this.$wrapper.children];
    const TabHeader = this.initTabHeader($tabPanels);
    this.$tabPanels = this.initTabPanels($tabPanels);
    this.$wrapper.insertBefore(TabHeader, this.$tabPanels);
  }
  initTabLine() {
    const $tabLine = document.createElement('span');
    $tabLine.setAttribute('class', 'tab-line');
    return $tabLine;
  }
  initTabHeader($panels) {
    const TabHeader = document.createElement('div');
    TabHeader.classList.add('tab-header');
    $panels.forEach(panel => {
      const $tabItem = document.createElement('span');
      $tabItem.setAttribute('class', 'tab-item');
      $tabItem.innerText = panel.dataset.tabName;
      TabHeader.appendChild($tabItem);
    });
    let line = this.initTabLine();
    line.style.width = TabHeader.appendChild(line);

    return TabHeader;
  }
  initTabPanels($panels) {
    const TabPanels = document.createElement('div');
    TabPanels.classList.add('tab-panels-box');
    $panels.forEach(panel => {
      panel.classList.add('tab-panel');
      TabPanels.appendChild(panel);
    });
    this.$wrapper.appendChild(TabPanels);
    return TabPanels;
  }

  setTabs() {
    this.$$tabItems = this.$wrapper.querySelectorAll('.tab-item');
    const TabIndex = this.$wrapper.dataset.tabActive - 1 || 0;
    this.$tabPanels.children[TabIndex].classList.add('active');
  }
  bindTabs() {
    let tabPanels = [...this.$tabPanels.children];
    let that = this;
    this.$$tabItems.forEach($tab =>
      $tab.addEventListener('click', () => {
        const index = [...this.$$tabItems].indexOf($tab);
        tabPanels.forEach(panel => {
          panel.classList.remove('active');
        });
        tabPanels[index].classList.add('active');
        that.$$tabItems.forEach(v => {
          v.classList.remove('selected');
        });
        that.$$tabItems[index].classList.add('selected');
        that.$wrapper.querySelector(
          '.tab-panels-box',
        ).style.transform = `translateX(-${index * 100}%)`;
      }),
    );
  }
}
