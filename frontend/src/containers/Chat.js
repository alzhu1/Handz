import React from 'react';
import Websocket from 'react-websocket';
import axios from 'axios';

export default class Chat extends React.Component {
  constructor(props) {
      super(props);
      // var token = "Token " + this.props.token;

      this.state = {loaded: false};
      console.log("Mount");

      this.sendSocketMessage = this.sendSocketMessage.bind(this);
  }

  async componentWillMount() {
      var token = "Token " + this.props.token;
      var self = this;

      var next = "/api/users/";

      while(next != null)
      {
          var test = await axios({
              url: next,
              method: "get",
              // headers: {
              //     "Authorization": token
              // }
          });
          console.log(test);

          test.data.results.map((username) => {
              self.props.add_text(username);
          })

          next = test.data.next;
      }
      this.setState({loaded: true});
  }

    sendSocketMessage(message) {
        const socket = this.refs.socket;
        socket.state.ws.send(JSON.stringify(message));
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);
    }

    render() {
          if(this.state.loaded) {

              console.log("render");
              console.log(this.props.texts);

              var allTexts = [];
              this.props.texts.map((text) => {
                  allTexts.push(<li key={text.pk}> {text.username + ' ' + text.is_logged_in} </li>);
              });

              return (
                  <div>
                      <Websocket ref="socket" url={this.props.socket}
                          onMessage={this.handleData.bind(this)} reconnect={true} />
                      <h1>Logged in Users!</h1>


                      <ul>
                          {allTexts}
                      </ul>

                  </div>
              );
          }

          else {
              console.log("false");
              return <div>Loading</div>;
          }

    }
}
