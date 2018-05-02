import React from 'react';
import {connect} from 'react-redux';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import LoginContainer from 'containers/LoginContainer';
import SignupContainer from 'containers/SignupContainer';
import LobbyContainer from 'containers/LobbyContainer';
import TableContainer from 'containers/TableContainer';

import BottomHand from 'containers/BottomHand';

import Test from 'demos/Test';
import Test2 from 'demos/Test2';
import Test3 from 'demos/Test3';
import Demo from 'demos/Demo';
import SvgMaterialIcons from 'demos/SvgMaterialIcons';
import PopperExample from 'demos/PopperExample';
import SimpleModalWrapped from 'demos/ModalDemo';
import MotionDemo from 'demos/MotionDemo';

import Tutorial from 'containers/tutorial/Tutorial';

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

                <Route exact path='/modal' component={SimpleModalWrapped} />

                <Route exact path='/motion' component={MotionDemo} />

                <Route exact path='/tutorial' component={Tutorial} />

            </Switch>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
