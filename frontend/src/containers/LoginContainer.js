import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import Login from 'components/Login'

import {connect} from 'react-redux';

import * as actions from 'redux/actions/actions'

import {mapStateToProps} from 'redux/actions/actions';

class LoginContainer extends React.Component {
    constructor() {
        super();
        this.state = {username: "", password: "", redirect: false};
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
                  login={this.props.api_login}
                  token={this.props.token}
                  logged_in={this.props.logged_in}/>
        );
    }
}




export const mapDispatchToProps = (dispatch) => {
    return {
      api_login: (username, password) => {
        dispatch(actions.apiLogin(username,password));
      }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
