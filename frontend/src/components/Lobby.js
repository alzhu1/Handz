import React from 'react';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class Lobby extends React.Component {
    render() {
            return (
                <div>
                    <h1>This is the Home page!</h1>
                    <button onClick={() =>
                        {this.props.logoutThunk()}}>Logout</button>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
