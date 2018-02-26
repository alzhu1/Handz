import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Button from 'material-ui/Button';

var _ = require('lodash');

class TableList extends React.Component {

    render() {
          let tables = this.props.tablelist.map((id) => {
            return (<li key={id}>Table {id}
                        <Link to="/table" onClick={() =>
                            {this.props.joinTableThunk(id)}}>
                            Join Table
                        </Link>
                    </li>)
            })

      return (
        <div>
            <Button onClick={() =>
                {this.props.createTableThunk('standard')}}>Create Table
            </Button>
            <Button component={props => <Link to="/table" {...props} /> }
                onClick={() => {this.props.createTableThunk('single')}}>
                  Play Single Player
            </Button>
            <Button component={props => <Link to="/card" {...props} /> }>
                  Test
            </Button>
            {tables}
        </div>
      )
    }
}

// <li key={id}>Table {id}
//             <button onClick={() =>
//                 {this.props.joinTableThunk(id)}}>
//                 Join Table
//             </button>

export default connect(mapStateToProps, mapDispatchToProps)(TableList);
