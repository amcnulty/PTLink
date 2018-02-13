import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Header, SignUpInput, BasicBtn, Radio } from '../../components';
import {API} from '../../Utils';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userID: '',
      username: '',
      email: '',
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
      <div className='container-fluid home'>
        <Header
          isUser={this.state.userID}
        />
        <h1>This is the signup page yo!</h1>
        
        <form onSubmit={this.handleSubmit}>

          <SignUpInput 
            label='Username' 
            value={this.state.username} 
            handleChange={this.handleChange.bind(this,'username')} />

          <SignUpInput 
            label='Email Address' 
            handleChange={this.handleChange.bind(this, 'email')} 
            value={this.state.email}/>

          <SignUpInput 
            label='Password' 
            handleChange={this.handleChange.bind(this,'password')} 
            value={this.state.password} />

          <Radio 
            name='Parent'  
            label='Parent' 
            handleChange={this.handleChange.bind(this, 'role')}
            value={this.state.role==='Parent'}/>

          <Radio 
            name='Teacher'  
            label='Teacher' 
            handleChange={this.handleChange.bind(this, 'role')}
            value={this.state.role==='Teacher'}/>

          <BasicBtn 
            classes='btn-primary' 
            btnTxt='Sign Up' type='submit'/>

        </form>
      </div>
    )
  }
}

export default Signup;