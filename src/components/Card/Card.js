import React, { Component } from 'react';
import './Card.css';
import axios from 'axios';
import '@material/card/dist/mdc.card.css';
import Spinner from '../Spinner/Spinner';
export default class Card extends Component{
  constructor(){
    super();
    this.state = {
        profile:'',
        username: '',
        avatar_url: null,
        html_url : null,
        loading:false,
        login:'',
        bio:'',
        followers: '',
        following: '',
        public_repos: '',
        company: '',
        email: ''
    }
  }
handleChange = async (e) => {
    this.setState({username: e.target.value})
    this.setState({loading:true});
    try {
      const res = await axios.get('https://api.github.com/users/'+e.target.value);
      console.log('response=======>',res.data);
      const { avatar_url, html_url, login, bio, followers, following, public_repos, company, email } = res.data;
      this.setState({profile: 'found'});
      this.setState({avatar_url: avatar_url});
      this.setState({html_url: html_url});
      this.setState({login: login});
      this.setState({bio: bio});
      this.setState({followers: followers});
      this.setState({following: following});
      this.setState({public_repos: public_repos});
      this.setState({company: company});
      this.setState({email: email});
    } catch (e) {
      console.log('>>>>>>>Profile doesnt exist!');
      this.setState({profile: null});
      this.setState({loading:false});
    } finally {
      this.setState({loading:false});
    }
  }
  render() {
    const { login, bio, followers, following, public_repos, company, email } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="mdc-card">
          {this.state.profile==null && <Spinner loading={this.state.loading}/>}
          {this.state.profile!=null && this.state.avatar_url!=null && <img src={this.state.avatar_url} className="App-logo" alt="logo" />}
          <p style={{color:'black'}}>{login}</p>
          <p style={{color:'black'}}>{bio}</p>
          <p style={{color:'black'}}>{followers}</p>
          <p style={{color:'black'}}>{following}</p>
          <p style={{color:'black'}}>{public_repos}</p>
          <p style={{color:'black'}}>{company}</p>
          <p style={{color:'black'}}>{email}</p>

          {this.state.profile!=null && this.state.html_url!=null && <div><a href={this.state.html_url} className="App-logo" style={{color: 'cornflowerblue'}}> Profile Url</a></div>}
          </div>
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
