import React, { Component, PropTypes, cloneElement } from "react";
import styles from "../css/style.scss";
import classnames from "classnames";
import TabNav from "./TabNav";
import TabContent from "./TabContent";

class Tabs extends Component {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    defaultActiveIndex: PropTypes.number,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func
  };

  static defaultProps = {
    classPrefix: "tabs",
    onChange: () => {}
  };

  constructor(props) {
    super(props);

    // 确定初始化索引值
    const currProps = this.props;
    let activeIndex;

    if ("activeIndex" in currProps) {
      activeIndex = currProps.activeIndex;
    } else if ("defaultActiveIndex" in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex
    };
  }

  componentWillReceiveProps(nextProps) {
    if ("activeIndex" in nextProps) {
      this.setState({
        activeIndex: nextProps.activeIndex
      });
    }
  }

  handleTabClick(activeIndex) {
    const prevIndex = this.state.activeIndex;

    if (
      this.state.activeIndex !== activeIndex &&
      "defaultActiveIndex" in this.props
    ) {
      this.setState({
        activeIndex,
        prevIndex
      });

      this.props.onChange({ activeIndex, prevIndex });
    }
  }

  renderTabNav() {
    const { classPrefix, children } = this.props;

    return (
      <TabNav
        key="tabBar"
        classPrefix={classPrefix}
        onTabClick={this.handleTabClick.bind(this)}
        panels={children}
        activeIndex={this.state.activeIndex}
      />
    );
  }

  renderTabContent() {
    const { classPrefix, children } = this.props;

    return (
      <TabContent
        key="tabcontent"
        classPrefix={classPrefix}
        activeIndex={this.state.activeIndex}
        panels={children}
      />
    );
  }

  render() {
    const { className } = this.props;
    const cx = classnames(className, "ui-tabs");

    return (
      <div className={cx}>
        {this.renderTabNav()}
        {this.renderTabContent()}
      </div>
    );
  }
}

export default Tabs;
