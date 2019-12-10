// 装饰模式不需要改变已有的接口，作用是给对象添加功能。
import { connect } from 'react-redux';
class MyComponent extends React.Component {
  // ...
}
export default connect(mapStateToProps)(MyComponent);
