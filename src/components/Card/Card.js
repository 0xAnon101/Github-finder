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
        login:null,
        bio:'NA ',
        followers: '',
        following: '',
        public_repos: '',
        company: 'NA',
        email: 'NA',
        hide_all: false
    }
  }
handleChange = async (e) => {
    if(e.target.value === "") {
      this.setState({hide_all: true})
    }
    if(e.target.value.length === 1) {
      this.setState({hide_all: false})
    }
    this.setState({username: e.target.value})
    this.setState({loading:true});
    try {
      const res = await axios.get('https://api.github.com/users/'+e.target.value);
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
      this.setState({profile: null});
      this.setState({loading:false});
    } finally {
      this.setState({loading:false});
    }
  }
  render() {
    const { login, bio, followers, following, public_repos, company, email, profile,  html_url,  } = this.state;
    let logins = null;
    let spinners  = null;
    let html_urls =  null;
    let images = null;

    if( profile == null) {
      spinners = <Spinner loading={this.state.loading}/>
    } else if( this.state.avatar_url!= null) {
      images = <img src={this.state.avatar_url} className="App-logo" alt="logo" />
    }
    if(html_url!=null) {
      html_urls =  <div><a href={html_url} className="App-logo" style={{color: 'cornflowerblue'}}> {html_url}</a></div>
    }

    if(login!= null) {
      logins = <div style={{color:'black'}}> 
            <p >Username - {login}</p>
            <p >Bio - {bio}</p>
            <p >Followers - {followers}</p>
            <p >Following - {following}</p>
            <p >Public Repos - {public_repos}</p>
            <p >Company - {company}</p>
            <p >Email - {email}</p>
            <p>Profile Url - </p>
        </div>
    }

    return (
      <div className="App">
        <header className="App-header">
        {!this.state.hide_all ?
          <div className="mdc-card">
            {spinners}
            {images}
            {logins}
            {html_urls}
          </div>
          : ""
        }
          
          <h3> Enter Github username to search profile</h3>
          <input
          type="text"
          placeholder="Enter username"
          value={this.state.username}
          onChange={this.handleChange}/>
            {profile==null && <h2> No profile found!</h2>}
        </header>
      </div>
    );
  }
}
