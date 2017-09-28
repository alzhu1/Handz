import React from 'react';
import {connect} from 'react-redux';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import LoginContainer from 'containers/LoginContainer';
import SignupContainer from 'containers/SignupContainer';
import LobbyContainer from 'containers/LobbyContainer';
import CreateText from './CreateText';
import Chat from './Chat';

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';


class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/'
                render={() => (this.props.token !== "" ?
                    (<LobbyContainer  socket={this.props.lobbySock}/>) :
                    (<Redirect to='/login' />))} />


                <Route exact path='/login' component={LoginContainer} />


                <Route exact path='/signup' render={(props) => (
                    <SignupContainer {...props}
                    socket={this.props.signupSock} />
                )} />

                <Route exact path='/create-text' render={(props) => (
                    <CreateText {...props}
                    token={this.props.token}
                    socket={this.props.lobbySock}
                    add_text={this.props.add_text} />
                )}  />

                <Route exact path='/chat' render={(props) => (
                    <Chat {...props} token={this.props.token}
                    socket={this.props.chatSock}
                    texts={this.props.texts}
                    add_text={this.props.add_text}/>
                )}  />

                <Route render={() => (<Redirect to='/login' />)} />
            </Switch>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
