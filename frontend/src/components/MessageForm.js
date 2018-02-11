import React from 'react'
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import 'css/chat.css'

class MessageForm extends React.Component {

  componentDidMount = () => {
    this.input.focus()
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    if (this.input.value !== "") {
      this.props.chatThunk(this.input.value,'all')
      this.input.value = ""
    }
  }

  render() {
    return (
      <form className="MessageForm" onSubmit={this.handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            ref={(node) => (this.input = node)}
            placeholder={this.props.receiver}
          />
        </div>
        <div className="button-container">
          <button type="submit">
            Send
          </button>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
