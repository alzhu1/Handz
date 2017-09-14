import React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <Link to='/login'>Test Login</Link>
                <br></br>
                <Link to='/signup'>Test Signup</Link>
                <br></br>
                <Link to='/'>Test Lobby</Link>
            </div>
        );
    }
}
