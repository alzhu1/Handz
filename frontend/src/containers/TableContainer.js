import React from 'react';

import ChatContainer from 'containers/ChatContainer';
import Hand from 'containers/Hand';
import Auction from 'components/Auction';
import BiddingBox from 'components/BiddingBox';
import TableMarker from 'components/TableMarker';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';

import 'css/table.css'

class TableContainer extends React.Component {

  componentWillUnmount() {
      this.props.leaveSeatThunk(this.props.seat)
      this.props.leaveTableThunk(this.props.table_id)
  }

  render() {

    return (

        <div className="Table">
          {/* table div */}

            <Auction />
            {this.props.contract}

            <div className='HandTop'>
              <Hand position='top'/>
            </div>

            <div className="HandLeft">
              <Hand position='left'/>
            </div>

            <div className="TableMarker">
              <TableMarker/>
            </div>

            <div className="HandRight">
              <Hand position='right'/>
            </div>

            <div className="HandBottom">
              <Hand position='bottom'/>
            </div>

            <div className="BiddingBox">
              <BiddingBox />
            </div>


        </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
