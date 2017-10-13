import React from 'react';

import Chat from 'components/Chat';
import ChatWebsocket from 'websockets/ChatWebsocket';
import UserList from 'components/UserList';

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';
import {store} from 'index';

class ChatContainer extends React.Component {
  constructor() {
    super();
    this.state = {message: ''};
  }

  componentDidMount() {
    ChatWebsocket.connect();
    ChatWebsocket.listen(this, store);
  }

  componentWillUnmount() {
    ChatWebsocket.disconnect();
  }

  sendMessage(message) {
    ChatWebsocket.send(this, "chat", message, this.props.username);
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
          <UserList />

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
