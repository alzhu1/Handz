import React from 'react';
import Typography from 'material-ui/Typography';
import BottomHand from 'containers/BottomHand';
import TopHand from 'containers/TopHand';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

const T3 = () => {

  const textStyle = {

  }

  const hand = {'spades': "AKQJ", 'hearts': "AKQ",'diamonds': "AKQ", 'clubs': "AKQ"}
  const title = 'There is a second hand you control directly facing you. \
                  You will use your two hands to work together to win tricks.'

  return (
    <div>
      <Typography style={textStyle} variant="title">
        {title}
      </Typography>
      <TopHand direction='north'/>
      <BottomHand hand={hand}/>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(T3);
