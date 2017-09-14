import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Websocket from 'react-websocket';
import Signup from 'components/Signup'

export default class SignupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);
        this.setRedirect = this.setRedirect.bind(this);
        this.sendSocketMessage = this.sendSocketMessage.bind(this)

        this.state = {
            username: "",
            password: "",
            password2: "",
            redirect: false
        };
    }

    changeName(event) {
        this.setState({username: event.target.value});
    }

    changePassword(event) {
        this.setState({password: event.target.value});
    }

    changePassword2(event) {
        this.setState({password2: event.target.value});
    }

    setRedirect() {
        this.setState({redirect: true});
    }

    sendSocketMessage(message) {
        const socket = this.refs.socket;
        socket.state.ws.send(JSON.stringify(message));
    }

    createUser(username, password, password2) {
        if( password === password2 ) {
            this.setRedirect();

            this.sendSocketMessage(["Create User",
                        username,
                        password]);
        }
        else {
            alert("Passwords do not match");
        }
    }


    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);
    }

    render() {
      return(
        <div>
          <Websocket ref="socket" url={this.props.socket}
              onMessage={this.handleData.bind(this)} reconnect={true} />
          <Signup redirect={this.state.redirect}
                  username={this.state.username}
                  password={this.state.password}
                  password2={this.state.password2}
                  changeName={this.changeName}
                  changePassword={this.changePassword}
                  changePassword2={this.changePassword2}
                  // handleData={this.handleData.bind(this)}
                  socket={this.props.socket}
                  createUser={this.createUser}
                  sendSocketMessage={this.sendSocketMessage}/>
          </ div>
      )
    }
}
