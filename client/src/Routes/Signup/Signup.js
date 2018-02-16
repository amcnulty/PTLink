import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Header, SignUpInput, BasicBtn, Radio, Footer } from '../../components';
import {API} from '../../Utils';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userID: '',
      username: '',
      email: '',
      school: '',
      password: '',
      role: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(label, value) {
    this.setState({ [label]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      school: this.state.school,
      isTeacher: (this.state.role === 'Teacher')
    }

    API.signUpUser(user, (err, status) => {
      if (err) {
        alert("There has been an error with status: " + status);
      }
      else {
        alert("Profile Created!");
      }
    });
  }

  componentDidMount() {
    // call API to get userID (or null)
  }

  render() {
    return (
      <div className='container-fluid signup'>
        <Header
          isUser={this.state.userID}
        />
        <div className="container main-content">
          <h3 className="brand-font signup-instruction">
            Fill out the form below to join us!
          </h3>

          <div className="row app-info">
        
          <form onSubmit={this.handleSubmit}>

            <SignUpInput 
              label='Username' 
              value={this.state.username} 
              handleChange={this.handleChange.bind(this,'username')} 
              placeholder='Username'
            />

            <SignUpInput 
              label='Email Address' 
              handleChange={this.handleChange.bind(this, 'email')} 
              value={this.state.email}
              placeholder='Email Address'
            />

            <SignUpInput 
              label='Password' 
              handleChange={this.handleChange.bind(this,'password')} 
              value={this.state.password} 
              placeholder='Password'
              type="password"
            />

            <SignUpInput 
              label='School' 
              handleChange={this.handleChange.bind(this,'school')} 
              value={this.state.school} 
              placeholder='School'
            />

            <div className="radio-row">
              <Radio 
                name='Parent'  
                label='Parent' 
                handleChange={this.handleChange.bind(this, 'role')}
                value={this.state.role==='Parent'}
              />

              <Radio 
                name='Teacher'  
                label='Teacher' 
                handleChange={this.handleChange.bind(this, 'role')}
                value={this.state.role==='Teacher'}
              />
            </div>

            <BasicBtn 
              classes='btn-primary signupBtn' 
              btnTxt='Sign Up' type='submit'/>
          </form>
        </div>
      </div>

      <Footer>
          <div className="footer-wrapper">
            <div className="shareRow">
            <a href="//facebook.com/PT-Link-148731259172020/" target="_blank"><i className="fa fa-facebook-square"></i></a> 
            <a href="//twitter.com/afGroff" target="_blank"><i className="fa fa-twitter-square"></i></a></div>
            <div className="copyright"><i className="fa fa-copyright"></i> 2018 The Gorilla Gang</div>
          </div>
        </Footer>
    </div>
    )
  }
}

export default Signup;