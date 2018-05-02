import React from 'react';
import Typography from 'material-ui/Typography';
import BottomHand from 'containers/BottomHand';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

const T2 = () => {

  const textStyle = {

  }

  const title = 'Each person is dealt 13 cards from a standard 52 card deck.'
  const body = 'There are 4 suits, spades hearts diamonds and clubs. '

  return (
    <div>
      <Typography style={textStyle} variant="title">
        {title}
      </Typography>
      <Typography style={textStyle} variant="title">
        {body}
      </Typography>
      <BottomHand/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(T2);
