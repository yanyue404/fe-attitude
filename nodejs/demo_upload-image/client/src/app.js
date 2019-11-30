import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import avatarURL from './images/avatar.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      imageURL: '',
    };
  }

  handleChange(e) {
    e.preventDefault();
    let API_URL = 'http://localhost:8000';
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append('avatar', file);

    axios.post(`${API_URL}/upload`, formData).then(response => {
      this.setState({ imageURL: API_URL + response.data.path.substr(6) });
    });
  }

  getStyles() {
    return {
      root: {
        width: '300px',
        margin: '100px auto',
        padding: '30px 0',
        backgroundColor: '#fff',
      },
      img: {
        display: 'block',
        margin: '0 auto 50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
      },
      div: {
        position: 'relative',
        borderRadius: '50px',
        width: '150px',
        height: '35px',
        margin: '30px auto 0',
        border: '1px solid #ccc',
      },
      input: {
        position: 'absolute',
        width: '150px',
        height: '35px',
        cursor: 'pointer',
        opacity: '0',
        zIndex: '100',
      },
      text: {
        position: 'absolute',
        width: '150px',
        height: '35px',
        lineHeight: '35px',
        top: '0',
        cursor: 'pointer',
        textAlign: 'center',
        color: '#222',
        fontSize: '15px',
      },
    };
  }

  render() {
    let styles = this.getStyles();

    return (
      <div style={styles.root}>
        <img src={this.state.imageURL || avatarURL} style={styles.img} />
        <div style={styles.div}>
          <input
            type="file"
            onChange={this.handleChange.bind(this)}
            style={styles.input}
          />
          <div style={styles.text}>点击更换头像</div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
