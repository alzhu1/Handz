import React from 'react';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';
import {Link} from 'react-router-dom';
import Tutorial from 'containers/tutorial/Tutorial';

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
                    <Tutorial />
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
