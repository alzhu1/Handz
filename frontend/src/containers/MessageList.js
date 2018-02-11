import React from 'react'
import PropTypes from 'prop-types'
import Message from 'components/Message'
import 'css/index.css'

class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    messages: [],
  }


  componentDidUpdate = () => {
    this.node.scrollTop = this.node.scrollHeight
  }

  render() {
    return (
        <div className="MessageList" ref={(node) => (this.node = node)}>
          {this.props.messages.map((message, i) => (
            <Message key={i} {...message} />
          ))}
        </div>
      )
    }
  }

  // componentDidUpdate = () => {
  //   this.node.scrollTop = this.node.scrollHeight
  // }
  //
  // render() {
  //   return (
  //     <div className="MessageList" ref={(node) => (this.node = node)}>
  //       {this.props.messages.map((message, i) => (
  //         <Message key={i} {...message} />
  //       ))}
  //     </div>
  //   )
  // }

export default MessageList
