import wrapWithLoadData from './hoc/wrapWithLoadData';
import wrapWithAjaxData from './hoc/wrapWithAjaxData';

class InputWithUserName extends Component {
  render() {
    return <input value={this.props.data} />;
  }
}

InputWithUserName = wrapWithAjaxData(InputWithUserName);
InputWithUserName = wrapWithLoadData(InputWithUserName, 'username');
export default InputWithUserName;
