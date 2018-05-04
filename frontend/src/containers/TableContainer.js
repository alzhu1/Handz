import React from 'react';
import Hand from 'containers/Hand';
import Auction from 'components/Auction';
import BiddingBox from 'components/BiddingBox';
import PlayedCardArea from 'containers/PlayedCardArea';
import TricksArea from 'containers/TricksArea';
import BackButton from 'containers/BackButton';
import ScoringModal from 'containers/ScoringModal';

import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class TableContainer extends React.Component {

  componentWillUnmount() {
      this.props.leaveSeatThunk(this.props.seat)
      this.props.leaveTableThunk(this.props.table_id)
  }

  render() {
    return (
        <div className="Table">
            <div className='BottomRight'>
              <Auction />
            </div>
            <div className='HandTop'>
              <Hand position='top'/>
            </div>
            <div className="HandLeft">
              <Hand position='left'/>
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
            <div className="PlayedCardArea">
              <PlayedCardArea seat={this.props.seat}
                              trick={this.props.trick}
                              prev_trick={this.props.prev_trick}
                              trick_string={this.props.trick_string}/>
            </div>
            <div className="TricksArea">
              <TricksArea trick_string={this.props.trick_string}/>
            </div>
            <BackButton />
            <ScoringModal />
        </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableContainer);
