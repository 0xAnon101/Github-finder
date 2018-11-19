import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state = {
        username: '',
        avatar_url: null,
        html_url : null
    }
  }
  handleChange = (e) => {
    this.setState({username: e.target.value})
    axios.get('https://api.github.com/users/'+e.target.value).then(res=>{
      console.log(res.data.avatar_url);
      this.setState({avatar_url: res.data.avatar_url});
      this.setState({html_url: res.data.html_url});
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.avatar_url!=null && <img src={this.state.avatar_url} className="App-logo" alt="logo" />}
          {this.state.html_url!=null && <a href={this.state.html_url} className="App-logo"> Profile Url</a>}
          <h3> Enter Github username to search profile</h3>
          <input
          type="text"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleChange}/>

        </header>
      </div>
    );
  }
}

export default App;
