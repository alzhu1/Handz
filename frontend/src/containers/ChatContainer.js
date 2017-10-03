import React from 'react';

import Chat from 'components/Chat';
import ChatWebsocket from 'websockets/ChatWebsocket';

import Websocket from 'react-websocket';

class ChatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chatSock: "ws://localhost:8000/chat/"};

    ChatWebsocket.connect(this.state.chatSock);
    ChatWebsocket.listen(this);
  }

  sendSocketMessage(message) {
      const socket = this.refs.socket;
      console.log('json stringify message');
      console.log(socket);
      console.log(JSON.stringify(message));
      socket.state.ws.send(JSON.stringify(message));
      console.log('sent!');
  }

  componentWillUnmount() {
      ChatWebsocket.disconnect();
  }

  handleClick(e) {
    e.preventDefault();
    ChatWebsocket.send(this);
  }

  render() {
    return (
      <div>
      <Websocket ref="socket" url={this.state.chatSock}
          onMessage={() => {}} reconnect={true} />


          <button onClick={this.handleClick}>
            Activate Lasers
          </button>

          <form onSubmit={(e) => {
              e.preventDefault();
              this.sendSocketMessage({testie: 'testy message'});
            }}>
              <input name="usermsg" type="text" size="63" />
              <input name="submitmsg" type="submit" value="Send" />
          </form>


      </div>
    )
  }
}

// <Chat sendMessage={this.sendSocketMessage}/>

export default ChatContainer;
