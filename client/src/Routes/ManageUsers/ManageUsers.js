import React, { Component } from 'react';

import { MyMainNav, MyMainContent, InviteUser } from '../../components';


class ManageUsers extends Component {

  state = {
    navStateClass   : '',
  }

  componentDidMount() {
    // call API to get userID (or null)
  }

  handleNavToggle(isOpen) {
    if (isOpen) {
      this.setState({navStateClass : 'main-nav-opened'})  
    }
    else {
      this.setState({navStateClass : ''})  
    }
  }

  render() {
    return (
      <div className={"container-fluid my " + this.state.navStateClass}>
        <MyMainNav 
          onToggle={(isOpen) => this.handleNavToggle(isOpen)}
        />
        <MyMainContent
          title="manage users"
          contentClasses ='manage-users'>
        
          <div className="user-container">
            <InviteUser />
            This is the manage user page, teacher access ONLY<br/>
            <ul>
              <li>TODO: Invite User</li>
              <li>TODO: Display a list of Users from the current teacher's school</li>
              <li>TODO: add links to edit, delete, archieve Users</li>
            </ul>
          </div>

        </MyMainContent>
      </div>
    )
  }
}

export default ManageUsers;