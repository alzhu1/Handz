import React from 'react';
import {Link} from 'react-router-dom';

export default class TextDetail extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <p>{this.props.match.params.id}</p>

                <br />

                <Link to='/'>Back to lobby</Link>
            </div>
        )
    }
}
