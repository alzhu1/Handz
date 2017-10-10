import React from 'react';

import Chat from 'components/Chat';
import ChatWebsocket from 'websockets/ChatWebsocket';

import Websocket from 'react-websocket';
import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chatSock: "ws://localhost:8000/chat/",
                  message: ''};

    ChatWebsocket.connect(this.state.chatSock);
    ChatWebsocket.listen(this);
  }

  componentWillUnmount() {
    ChatWebsocket.disconnect();
  }

  sendMessage(message) {
    ChatWebsocket.send(this, message, this.props.username);
  }

  changeMessage(event) {
    this.setState({message: event.target.value});
  }

  render() {
    return (
      <div>
          <Chat message={this.state.message}
                chats={this.props.chats}
                sendMessage= {(e) => this.sendMessage(e)}
                changeMessage= {(e) => this.changeMessage(e)}/>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
