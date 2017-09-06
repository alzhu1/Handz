import React from 'react';
import {connect} from 'react-redux';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Lobby from './Lobby';
import CreateText from './CreateText';

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' render={() => (this.props.token !== "" ?
                    (<Lobby logout={this.props.logout} login={this.props.login}
                        token={this.props.token} socket={this.props.lobbySock}
                        add_text={this.props.add_text} reset_text={this.props.reset_text}
                        texts={this.props.texts} />) :

                    (<Redirect to='/login' />))} />

                <Route exact path='/login' render={(props) => (
                    <Login {...props} login={this.props.login} />
                )} />

                <Route exact path='/signup' render={(props) => (
                    <Signup {...props} socket={this.props.signupSock} />
                )} />

                <Route exact path='/create-text' render={(props) => (
                    <CreateText {...props} token={this.props.token} socket={this.props.lobbySock} add_text={this.props.add_text} />
                )}  />

                <Route render={() => (<Redirect to='/login' />)} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        texts: state.texts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (token) => {
            dispatch({
                type: "LOGIN",
                payload: token
            });
        },
        logout: () => {
            dispatch({
                type: "LOGOUT"
            });
        },
        add_text: (text) => {
            dispatch({
                type: "ADD_TEXT",
                payload: text
            })
        },
        reset_text: () => {
            dispatch({
                type: "RESET_TEXT"
            })
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
