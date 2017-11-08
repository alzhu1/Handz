import React from 'react';

import ChatContainer from 'containers/ChatContainer';
import Hand from 'containers/Hand';
import Auction from 'components/Auction';
import BiddingBox from 'components/BiddingBox';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';

import 'css/table.css'

class TableContainer extends React.Component {

  componentWillUnmount() {
      this.props.leaveSeatThunk(this.props.seat, this.props.table_id)
      this.props.leaveTableThunk(this.props.table_id)
      this.props.getHand('')
  }

  render() {

    // let styles = {
    //   display: 'flex',
    //   alignSelf: 'center',
    //   transform: 'rotate(90deg)',
    // }

    return (
        <div>
          <div className="Table">
              <Hand className="HandTop" position='top'/>
              <Hand className="HandLeft" position='left'/>
              <Auction />
              <Hand className="HandRight" position='right'/>
              <Hand className="HandBottom" position='bottom'/>
              <BiddingBox />

          </div>
          <ChatContainer />
        </div>
      )
    }
}


// <Button onClick={()=> this.props.takeSeatThunk('east',this.props.table_id)}>
//     East
// </Button>
// <Button onClick={()=> this.props.takeSeatThunk('south',this.props.table_id)}>
//     South
// </Button>
// <Button onClick={()=> this.props.takeSeatThunk('west',this.props.table_id)}>
//     West
// </Button>


export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
