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
        this.state = {loaded: false};
        LobbyWebsocket.connect();
        LobbyWebsocket.listen(this);
    }

    async componentWillMount() {
        var token = "Token " + this.props.token;
        var self = this;

        var next = "/api/text/";

        this.props.resetText();
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
                self.props.addText(text);
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
            <Lobby loaded={this.state.loaded}/>
            <ChatContainer />
          </div>
        )

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
