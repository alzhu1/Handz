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

  const hand1 = {'spades': "KT84", 'hearts': "Q93",'diamonds': "JT65", 'clubs': "K4"}
  const hand2 = {'spades': "AQ3", 'hearts': "J432",'diamonds': "Q3", 'clubs': "T983"}
  const title = 'You will also control the North hand, the hand opposite yours. \
                  You will use your two hands to work together to win tricks.'

  return (
    <div>
      <Typography style={textStyle}>
        {title}
      </Typography>
      <div style={topHandStyle}>
        <TopHand show_dummy={true}
                is_dummy={true}
                hand={hand2}
                hand_class={'hand vhand-compact active-hand'}/>
      </div>
      <br />
      <br />
      <br />
      <div style={bottomHandStyle}>
        <BottomHand hand={hand1}/>
      </div>
    </div>
  )
}

export default (T3);
