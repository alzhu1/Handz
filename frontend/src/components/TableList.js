import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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
            <button onClick={() =>
                {this.props.createTableThunk()}}>Create Table
            </button>
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
