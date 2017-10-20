import React from 'react';

import ChatContainer from 'containers/ChatContainer';
import Lobby from 'components/Lobby'


export default class LobbyContainer extends React.Component {
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
