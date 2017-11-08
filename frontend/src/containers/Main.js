import React from 'react';
import {connect} from 'react-redux';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import LoginContainer from 'containers/LoginContainer';
import SignupContainer from 'containers/SignupContainer';
import LobbyContainer from 'containers/LobbyContainer';
import TableContainer from 'containers/TableContainer';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';

class Main extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/'
                render={() => (this.props.is_logged_in ?
                    (<LobbyContainer />) :
                    (<Redirect to='/login' />))} />

                <Route exact path='/login' component={LoginContainer} />

                <Route exact path='/signup' component={SignupContainer} />

                <Route path='/table' component={TableContainer} />

            </Switch>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
