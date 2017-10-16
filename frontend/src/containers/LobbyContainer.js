import React from 'react';
import axios from 'axios';

import Lobby from 'components/Lobby';
import LobbyWebsocket from 'websockets/LobbyWebsocket';

import ChatContainer from 'containers/ChatContainer';

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

class LobbyContainer extends React.Component {
    constructor() {
        super();
        this.state = {loaded: false, chat: 'default'};
        LobbyWebsocket.connect();
        LobbyWebsocket.listen(this);
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
      if (!this.props.is_logged_in) {
          return <div> Loading </div>
      }
      else {
          return(
            <div>
              <Lobby loaded={this.state.loaded}
              texts={this.props.texts}
              token={this.props.token}
              getToken={this.props.getToken}
              reset_text={this.props.reset_text}
              isLoggedIn={this.props.isLoggedIn}
              />
              <ChatContainer />
            </div>
          )
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
