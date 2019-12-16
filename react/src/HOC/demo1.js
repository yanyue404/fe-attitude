import wrapWithLoadData from './hoc/wrapWithLoadData';

class InputWithUserName extends Component {
  render() {
    return <input value={this.props.data} />;
  }
}

InputWithUserName = wrapWithLoadData(InputWithUserName, 'username');
export default InputWithUserName;
