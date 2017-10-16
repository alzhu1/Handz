import React from 'react';
import Login from 'components/Login'

export default class LoginContainer extends React.Component {
    constructor() {
        super();
        this.state = {name: "", password: ""};
    }

    changeName = (event) => {
        this.setState({name: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <Login
                name={this.state.name}
                password={this.state.password}
                changeName={this.changeName}
                changePassword={this.changePassword}/>
        );
    }
}
