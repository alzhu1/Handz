import React from 'react';

import ChatContainer from 'containers/ChatContainer';
import Lobby from 'components/Lobby'
import TableList from 'components/TableList'

export default class LobbyContainer extends React.Component {

    render() {
        return(
          <div>
            <Lobby/>
            <TableList/>
          </div>
        )
    }
}
