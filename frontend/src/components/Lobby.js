import React from 'react';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';

class Lobby extends React.Component {
    render() {
            return (
                <div>
                    <Button size='large'
                        onClick={() =>
                        {this.props.logoutThunk()}}>Logout</Button>
                    <Button size='large'
                        component={props => <Link to="/table" {...props} /> }
                        onClick={() => {this.props.createTableThunk('single')}}>
                          Play!
                    </Button>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
