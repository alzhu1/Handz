import React from 'react'
import Message from 'components/Message'
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import 'css/index.css'

class MessageList extends React.Component {

  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight
  }

  render() {
    return (
        <div className="MessageList" ref={(node) => (this.node = node)}>
          {this.props.chats.map((message, i) => (
            <Message key={i} {...message} />
          ))}
        </div>
      )
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
