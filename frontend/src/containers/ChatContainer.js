import React from 'react';

import Chat from 'components/Chat';
import UserList from 'components/UserList';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class ChatContainer extends React.Component {
  constructor() {
    super();
    this.state = {message: '', receiver: 'all'};
  }

  changeMessage(event) {
    this.setState({message: event.target.value});
  }

  changeReceiver(name) {
    if (name === this.props.username) {
      name = 'all'
    }
    this.setState({receiver: name});
  }

  render() {
    return (
      <div>
          <UserList userlist={this.props.userlist}
                    changeReceiver= {(e) => this.changeReceiver(e)}/>
          <Chat message={this.state.message}
                receiver={this.state.receiver}
                chats={this.props.chats}
                sendMessage= {(a,b) => this.props.chatThunk(a,b)}
                changeMessage= {(e) => this.changeMessage(e)}
                changeReceiver= {(e) => this.changeReceiver(e)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
