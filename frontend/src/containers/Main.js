import React from 'react';
import {connect} from 'react-redux';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import LoginContainer from 'containers/LoginContainer';
import SignupContainer from 'containers/SignupContainer';
import LobbyContainer from 'containers/LobbyContainer';
import TableContainer from 'containers/TableContainer';
import Card from 'components/Card';
import Demo from 'containers/Demo';
import BottomHand from 'containers/BottomHand';
import Test from 'containers/Test';
import Test2 from 'containers/Test2';
import Test3 from 'containers/Test3';
import PlayedCardArea from 'containers/PlayedCardArea';

import SvgMaterialIcons from 'containers/SvgMaterialIcons';
import PopperExample from 'demos/PopperExample';

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

                <Route path='/demo' component={Demo} />

                <Route path='/bottom' component={BottomHand} />

                <Route exact path='/card' component={Test} />

                <Route exact path='/test2' component={Test2} />

                <Route exact path='/test3' component={Test3} />

                <Route exact path='/icon' component={SvgMaterialIcons} />

                <Route exact path='/popper' component={PopperExample} />

            </Switch>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
