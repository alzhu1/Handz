import React from 'react';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';

class Lobby extends React.Component {
    render() {
            return (
                <div>
                    <h1>This is the Home page!</h1>
                    <Button onClick={() =>
                        {this.props.logoutThunk()}}>Logout</Button>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
