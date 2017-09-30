import React from 'react';
import { Link } from 'react-router-dom';
import Websocket from 'react-websocket';
import axios from 'axios';

import Lobby from 'components/Lobby';
import Chat from 'components/Chat';
import LobbyWebsocket from 'websockets/LobbyWebsocket';
import ChatWebsocket from 'websockets/ChatWebsocket';

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

class LobbyContainer extends React.Component {
    constructor(props) {
        super(props);
        // var token = "Token " + this.props.token;

        this.state = {loaded: false};
        console.log("Mount");

        // this.sendSocketMessage = this.sendSocketMessage.bind(this);
        LobbyWebsocket.connect(this.props.socket);
        LobbyWebsocket.listen(this);

        // ChatWebsocket.connect(this.props.socket);
        // ChatWebsocket.listen(this);
    }

    async componentWillMount() {
        var token = "Token " + this.props.token;
        var self = this;

        var next = "/api/text/";

        this.props.reset_text();
        while(next != null)
        {
            var test = await axios({
                url: next,
                method: "get",
                headers: {
                    "Authorization": token
                }
            });
            console.log(test);

            test.data.results.map((text) => {
                self.props.add_text(text);
            })

            next = test.data.next;
        }
        this.setState({loaded: true});
    }

    componentWillUnmount() {
        LobbyWebsocket.disconnect();
    }

    render() {
      return(
        <div>
          <Lobby loaded={this.state.loaded} texts={this.props.texts}
          socket={this.props.socket} token={this.props.token}
          logout={this.props.logout}
          />
          <Chat />
        </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
