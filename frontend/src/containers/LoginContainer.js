import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import Login from 'components/Login'

import {connect} from 'react-redux';

import * as actions from 'redux/actions/actions'

import {mapStateToProps} from 'redux/actions/actions';

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", redirect: false};
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        console.log("Login mounted");
    }

    login(username, password) {
        // alert();
        var self = this;
        axios.post("/api/auth/", {
            username: username,
            password: password
        })
        .then(function(response) {
            // localStorage.setItem("token", response.data.token);
            console.log("Test in login, redirect");
            console.log(response.data.token);
            self.props.login(response.data.token);
        })
        .catch(function(error) {
            console.log(error);
        });

    }


    changeName = (event) => {
        this.setState({username: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (

            <Login
                  username={this.state.username}
                  password={this.state.password}
                  changeName={this.changeName}
                  changePassword={this.changePassword}
                  login={this.login}
                  token={this.props.token}/>
        );
    }
}




export const mapDispatchToProps = (dispatch) => {
    return {
      login: (token) => {
        dispatch(actions.login(token))
      },
      // api_login: (username,password) => {
      //   dispatch(actions.apiLogin(username,password))
      // }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
