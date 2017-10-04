import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

export default class Lobby extends React.Component {
    render() {
        if(this.props.loaded) {

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
                    <h1>This is the Home page!</h1>
                    <button onClick={() => {
                        this.props.logout();
                        var token = this.props.token;
                        axios.post("/api/logout/", {
                                token: token
                            });
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
