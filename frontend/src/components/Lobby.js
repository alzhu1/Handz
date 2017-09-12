import React from 'react';
import { Link } from 'react-router-dom';
import Websocket from 'react-websocket';



export default class Lobby extends React.Component {
    render() {
        if(this.props.loaded) {

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
                          onMessage={this.props.handleData} reconnect={true} />
                    <h1>This is the Home page!</h1>
                    <button onClick={() => {
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
