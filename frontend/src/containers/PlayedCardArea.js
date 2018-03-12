import React from 'react';
import PlayedCard from 'containers/PlayedCard';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';



class PlayedCardArea extends React.Component {

  render() {
    return (
          <div className='PlayedCardArea2'>
            <PlayedCard position='top' />
            <PlayedCard position='left' />
            <PlayedCard position='right' />
            <PlayedCard position='bottom' />
          </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayedCardArea);
