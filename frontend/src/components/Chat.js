import React from 'react';
var _ = require('lodash');


export default class Chat extends React.Component {
    render() {
      const chats = this.props.chats.map((chat) =>
        <li key={_.uniqueId()}>{chat}</li>)

      return (
        <div>
          <div>
            {chats}
          </div>
          <form onSubmit={(e) => {
              e.preventDefault();
              this.props.sendMessage(this.props.message, this.props.receiver);
              }
            }>
              <input placeholder={this.props.receiver} type="text" size="63"
              onChange={this.props.changeMessage}/>
              <input name="submitmsg" type="submit" value="Send" />
          </form>
        </div>
      )
    }
}
