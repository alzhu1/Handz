import React from 'react';

import Chat from 'components/Chat';
import UserList from 'components/UserList';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {store} from 'index';

class ChatContainer extends React.Component {
  constructor() {
    super();
    this.state = {message: ''};
  }

  changeMessage(event) {
    this.setState({message: event.target.value});
  }

  render() {
    return (
      <div>
          <UserList userlist={this.props.userlist}/>
          <Chat message={this.state.message}
                chats={this.props.chats}
                sendMessage= {(e) => this.props.chatThunk(e)}
                changeMessage= {(e) => this.changeMessage(e)}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
