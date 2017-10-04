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

  // sendSocketMessage(message) {
  //     const socket = this.refs.socket;
  //     console.log('json stringify message');
  //     console.log(socket);
  //     console.log(JSON.stringify(message));
  //     socket.state.ws.send(JSON.stringify(message));
  //     console.log('sent!');
  // }

  componentWillUnmount() {
    ChatWebsocket.disconnect();
  }

  sendMessage(message) {
    ChatWebsocket.send(this, message);
  }

  changeMessage(event) {
    this.setState({message: event.target.value});
  }

  handleClick(e) {
    e.preventDefault();
    ChatWebsocket.send(this, 'hi');
  }

  render() {
    return (
      <div>
          <button onClick={this.handleClick}>
            Activate Lasers
          </button>
          {this.props.chats}
          <Chat message={this.state.message}
                sendMessage= {(e) => this.sendMessage(e)}
                changeMessage= {(e) => this.changeMessage(e)}
          />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
