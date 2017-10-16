import React from 'react';
import { Link } from 'react-router-dom';

import {mapStateToProps, mapDispatchToProps} from 'redux/actions/actions';
import {connect} from 'react-redux';

class Lobby extends React.Component {
    render() {
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
                    <button onClick={() =>
                        {this.props.logout(this.props.token)}}>Logout</button>
                    <ul>
                        {allTexts}
                    </ul>

                    <Link to='/create-text'>Create text</Link>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
