import React from 'react';
import Typography from 'material-ui/Typography';
import BottomHand from 'containers/BottomHand';
import TopHand from 'containers/TopHand';

const T3 = () => {

  const textStyle = {

  }

  const bottomHandStyle = {
    textAlign: 'center'
  }

  const topHandStyle = {
    textAlign: 'center',
    margin: 'auto'
  }

  const hand = {'spades': "AKQJ", 'hearts': "AKQ",'diamonds': "AKQ", 'clubs': "AKQ"}
  const title = 'You will also control the North hand, the hand directly facing you. \
                  You will use your two hands to work together to win tricks.'

  return (
    <div>
      <Typography style={textStyle} variant="title">
        {title}
      </Typography>
      <div style={topHandStyle}>
        <TopHand show_dummy={true}
                is_dummy={true}
                hand={hand}
                hand_class={'hand vhand-compact active-hand'}/>
      </div>
      <br />
      <br />
      <br />
      <div style={bottomHandStyle}>
        <BottomHand hand={hand}/>
      </div>
    </div>
  )
}

export default (T3);
