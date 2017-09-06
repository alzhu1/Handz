import React from 'react';
import { Redirect, Link } from 'react-router-dom';

var axios = require("axios");

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
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

    changeName(event) {
        this.setState({username: event.target.value});
    }

    changePassword(event) {
        this.setState({password: event.target.value});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <div>
                <h1>This is the Login page!</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.login(this.state.username, this.state.password);
                }}>
                    <p><label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.changeName} />
                    </label></p>

                    <p><label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.changePassword} />
                    </label></p>

                    <input type="submit" value="Login" />
                </form>
                <Link to='/signup'>Create account</Link>
            </div>
        );
    }
}
