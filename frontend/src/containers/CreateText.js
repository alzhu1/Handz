import React from 'react';
import { Link } from 'react-router-dom';
import Websocket from 'react-websocket';
import axios from 'axios';

export default class CreateText extends React.Component {
    constructor(props) {
        super(props);
        this.changeText = this.changeText.bind(this);
        this.changeBool = this.changeBool.bind(this);

        this.sendSocketMessage = this.sendSocketMessage.bind(this);

        this.state = {text: "", bool: false};
    }

    changeText(event) {
        this.setState({text: event.target.value});
    }

    changeBool(event) {
        this.setState({bool: event.target.checked});
    }

    async createText(text, bool) {
        var token = "Token " + this.props.token;
        var test = await axios({
            url: "/api/text/",
            method: "post",
            headers: {
                "Authorization": token
            },
            data: {
                text: text,
                rand_bool: bool
            }
        });

        console.log("Post success");
        this.sendSocketMessage({
                    type: "CREATE_TEXT",
                    payload: test.data
                });
    }

    sendSocketMessage(message) {
        const socket = this.refs.socket;
        console.log('json message')
        console.log(JSON.stringify(message))
        socket.state.ws.send(JSON.stringify(message));
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log(result);
    }

    render() {
        return (
            <div>
                <Websocket ref="socket" url={this.props.socket}
                    onMessage={() => {}} reconnect={true} />
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.createText(this.state.text, this.state.bool);
                }}>

                <p><label>
                    Input text:
                    <input type="text" value={this.state.text} onChange={this.changeText} />
                </label></p>

                <p><label>
                    Random boolean:
                    <input type="checkbox" checked={this.state.bool} onChange={this.changeBool} />
                </label></p>

                <input type="submit" value="Create text" />
                </form>
                <br />
                <Link to='/'>Back to lobby</Link>
            </div>
        )
    }
}
