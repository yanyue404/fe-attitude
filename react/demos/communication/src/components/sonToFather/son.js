import React from 'react';
class Son extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  handleChange(e) {
    this.props.setValue(e.target.value);
  }

  render() {
    return (
      <div>
        我是Son
        <input onChange={this.handleChange.bind(this)} />
        <br />
      </div>
    );
  }
}

export default Son;
