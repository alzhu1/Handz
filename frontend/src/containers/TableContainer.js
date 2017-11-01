import React from 'react';

import ChatContainer from 'containers/ChatContainer';
import Table from 'components/Table';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class TableContainer extends React.Component {

    render() {
      return (
        <div>
            <Table/>
            <ChatContainer/>
        </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
