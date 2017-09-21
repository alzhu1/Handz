import React from 'react';
import { Link } from 'react-router-dom';
import Websocket from 'react-websocket';
import axios from 'axios';

import Lobby from 'components/Lobby'

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

class LobbyContainer extends React.Component {
    constructor(props) {
        super(props);
        // var token = "Token " + this.props.token;

        this.state = {loaded: false};
        console.log("Mount");

        // this.sendSocketMessage = this.sendSocketMessage.bind(this);
    }

    async componentWillMount() {
        var token = "Token " + this.props.token;
        var self = this;

        var next = "/api/text/";

        this.props.reset_text();
        while(next != null)
        {
            var test = await axios({
                url: next,
                method: "get",
                headers: {
                    "Authorization": token
                }
            });
            console.log(test);

            test.data.results.map((text) => {
                self.props.add_text(text);
            })

            next = test.data.next;
        }
        this.setState({loaded: true});
    }


    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);

        if(result.createText == true)
        {
            this.props.add_text(result.text);
            console.log('added txt')
        }

    }

    render() {
      return(
        <Lobby loaded={this.state.loaded} texts={this.props.texts}
        socket={this.props.socket} token={this.props.token}
        logout={this.props.logout} handleData={this.handleData.bind(this)}
        />
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
