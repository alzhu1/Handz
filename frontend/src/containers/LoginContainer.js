import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import Login from 'components/Login'

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

export class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.setRedirect = this.setRedirect.bind(this);

        this.state = {username: "", password: "", redirect: false};
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
            self.props.login(response.data.token);
            self.setRedirect();
        })
        .catch(function(error) {
            console.log(error);
        });

    }

    setRedirect() {
        this.setState({redirect: true});
    }

    changeName = (event) => {
        this.setState({username: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <Login redirect={this.state.redirect}
                  username={this.state.username}
                  password={this.state.password}
                  changeName={this.changeName}
                  changePassword={this.changePassword}
                  login={this.login}/>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
