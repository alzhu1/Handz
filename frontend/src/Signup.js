import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Websocket from 'react-websocket';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.createUser = this.createUser.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.changePassword2 = this.changePassword2.bind(this);
        this.setRedirect = this.setRedirect.bind(this);

        this.sendSocketMessage = this.sendSocketMessage.bind(this);

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

    createUser(username, password, password2) {
        if( password === password2 ) {
            this.sendSocketMessage([username,
                                    password,
                                    password2]);
            this.setRedirect();
        }
        else {
            alert("Passwords do not match");
        }
    }

    sendSocketMessage(message) {
        const socket = this.refs.socket;
        socket.state.ws.send(JSON.stringify(message));
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: '/login',
                    state: {success: true}
                }} />
            );
        }
        return (
            <div>
                <Websocket ref="socket" url={this.props.socket}
                    onMessage={this.handleData.bind(this)} reconnect={true} />
                <h1>This is the Signup page!</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                     this.createUser(this.state.username,
                                     this.state.password,
                                     this.state.password2);
                }}>
                    <p><label>
                        Username:
                        <input type="text" value={this.state.username} onChange={this.changeName} />
                    </label></p>

                    <p><label>
                        Password:
                        <input type="password" value={this.state.password} onChange={this.changePassword} />
                    </label></p>

                    <p><label>
                        Confirm Password:
                        <input type="password" value={this.state.password2} onChange={this.changePassword2} />
                    </label></p>
                    <input type="submit" value="Submit" />
                </form>

                <Link to='/login'>Back to login</Link>
            </div>
        );
    }
}
