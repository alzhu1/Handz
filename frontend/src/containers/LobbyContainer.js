import React from 'react';

import ChatContainer from 'containers/ChatContainer';
import Lobby from 'components/Lobby'

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';


class LobbyContainer extends React.Component {
    constructor() {
        super();
        this.state = {loaded: false};
    }


    render() {
        return(
          <div>
            <Lobby loaded={this.state.loaded}/>
            <ChatContainer />
          </div>
        )

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
