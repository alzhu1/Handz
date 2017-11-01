import React from 'react';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import Hand from 'containers/Hand';

class Table extends React.Component {

    componentWillUnmount() {
        this.props.leaveSeatThunk(this.props.seat, this.props.table_id)
        this.props.leaveTableThunk(this.props.table_id)
        this.props.getHand('')
    }

    render() {
      return (
          <div>
              <button onClick={()=> this.props.takeSeatThunk('north',this.props.table_id)}>
                  North
              </button>
              <button onClick={()=> this.props.takeSeatThunk('east',this.props.table_id)}>
                  East
              </button>
              <button onClick={()=> this.props.takeSeatThunk('south',this.props.table_id)}>
                  South
              </button>
              <button onClick={()=> this.props.takeSeatThunk('west',this.props.table_id)}>
                  West
              </button>

              <Hand/>
          </div>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
