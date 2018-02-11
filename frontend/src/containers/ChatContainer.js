import React from 'react';

import Chat from 'components/Chat';
import UserList from 'components/UserList';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import MessageList from 'containers/MessageList'
import MessageForm from 'components/MessageForm'
import 'css/chat.css'

class ChatContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  handleNewMessage = (text) => {
    this.setState({
      messages: [...this.state.messages, { me: true, author: this.props.username, body: text }],
    })
  }

  render() {
    return (
      <div className="ChatContainer">
        <MessageList messages={this.state.messages}/>
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

// <Chat message={this.state.message}
//       receiver={this.state.receiver}
//       chats={this.props.chats}
//       sendMessage= {(a,b) => this.props.chatThunk(a,b)}
//       changeMessage= {(e) => this.changeMessage(e)}
//       changeReceiver= {(e) => this.changeReceiver(e)}/>

// <UserList userlist={this.props.userlist}
//           changeReceiver= {(e) => this.changeReceiver(e)}/>

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
