import React from 'react';
import {Launcher} from 'react-chat-window'
var _ = require('lodash');


export default class Chat extends React.Component {
    render() {
      const chats = this.props.chats.map((chat) =>
        <li key={_.uniqueId()}>{chat}</li>)

      return (
        <div>
          <div>
            <Launcher
              agentProfile={{
                teamName: 'react-live-chat',
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
              }}
            />
          </div>
          <form id="chat-id" onSubmit={(e) => {
              e.preventDefault();
              this.props.sendMessage(this.props.message, this.props.receiver);
              document.getElementById("chat-id").reset();
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
