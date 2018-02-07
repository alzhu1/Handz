import React from 'react';
import {connect} from 'react-redux';

import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import LoginContainer from 'containers/LoginContainer';
import SignupContainer from 'containers/SignupContainer';
import LobbyContainer from 'containers/LobbyContainer';
import TableContainer from 'containers/TableContainer';
import Card from 'components/Card';

import cardJS from 'cardsJS/cards.css';

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

                <Route exact path='/card'
                render={() => (
                  <div className="hand hhand-compact active-hand " data-bind='hand: {flow: "vertical"}'>
                    <div>
                      <img className='card' src={require('cardsJS/cards/KS.svg')}/>
                      <img className='card' src={require('cardsJS/cards/QS.svg')}/>
                      <img className='card' src={require('cardsJS/cards/KH.svg')}/>
                      <img className='card' src={require('cardsJS/cards/KD.svg')}/>
                      <img className='card' src={require('cardsJS/cards/KC.svg')}/>
                      <img className='card' src={require('cardsJS/cards/2S.svg')}/>
                    </div>
                    <div className='hand' data-hand='flow: vertical; spacing: 0.5; width: 90'>
                      <div>
                        <img className='card' src={require('cardsJS/cards/KS.svg')}/>
                        <img className='card' src={require('cardsJS/cards/QS.svg')}/>
                        <Card card='9S' />
                      </div>
                    </div>
                </div>
                )} />

            </Switch>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
