import React, { Component } from 'react';
import './Card.css';
import axios from 'axios';

export default class Card extends Component{
  constructor(){
    super();
    this.state = {
        profile:'',
        username: '',
        avatar_url: null,
        html_url : null
    }
  }
handleChange = async (e) => {
    this.setState({username: e.target.value})
    try {
      const res = await axios.get('https://api.github.com/users/'+e.target.value);
      this.setState({profile: 'found'});
      this.setState({avatar_url: res.data.avatar_url});
      this.setState({html_url: res.data.html_url});
    } catch (e) {
      console.log('>>>>>>>Profile doesnt exist!');
      this.setState({profile: null});

    } finally {

    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.profile!=null && this.state.avatar_url!=null && <img src={this.state.avatar_url} className="App-logo" alt="logo" />}
          {this.state.profile!=null && this.state.html_url!=null && <a href={this.state.html_url} className="App-logo"> Profile Url</a>}
          <h3> Enter Github username to search profile</h3>
          <input
          type="text"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleChange}/>
            {this.state.profile==null && <h2> No profile found!</h2>}
        </header>
      </div>
    );
  }
}
