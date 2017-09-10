import React from 'react';
import { Link } from 'react-router-dom';
import Websocket from 'react-websocket';

var axios = require("axios");

export default class Lobby extends React.Component {
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

    sendSocketMessage(message) {
       // sends message to django
       const socket = this.refs.socket;

       socket.state.ws.send(JSON.stringify(message));
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);

        if(result.createText == true)
        {
            this.props.add_text(result.text);
        }

        if(result.login == true)
        {
            this.sendSocketMessage(["Login", this.props.token]);
        }
    }

    render() {
        if(this.state.loaded) {

            console.log("render");
            console.log(this.props.texts);

            var allTexts = [];
            this.props.texts.map((text) => {
                allTexts.push(
                    <li key={text.pk}>
                        <Link to={'/text/' + text.pk}>
                            {text.text}
                        </Link>
                    </li>
                );
            });

            return (
                <div>
                    <Websocket ref="socket" url={this.props.socket}
                        onMessage={this.handleData.bind(this)} reconnect={true} />

                    <h1>This is the Home page!</h1>
                    <button onClick={() => {
                        this.sendSocketMessage(["Logout", this.props.token]);
                        this.props.logout();
                    }}>Logout</button>

                    <ul>
                        {allTexts}
                    </ul>

                    <Link to='/create-text'>Create text</Link>
                </div>
            );
        }

        else {
            console.log("false");
            return <div>Loading</div>;
        }
    }
}
