import React from 'react';
import Typography from 'material-ui/Typography';
import BottomHand from 'containers/BottomHand';

const T2 = () => {

  const textStyle = {

  }

  const handStyle = {
    textAlign: 'center'
  }

  const hand = {'spades': "KT84", 'hearts': "Q93",'diamonds': "JT65", 'clubs': "K4"}
  const title = 'A hand consists of 13 cards from a standard 52 card deck. \
                There are 4 suits, spades hearts diamonds and clubs.'
  const body = 'Four hands is dealt to four different seats, named after \
                the directions of a compass: North, East, South, and West.\
                You will be sitting South.'

  return (
    <div>
      <Typography style={textStyle}>
        {title}
      </Typography>
      <Typography style={textStyle}>
        {body}
      </Typography>
      <div style={handStyle}>
        <BottomHand hand={hand}/>
      </div>
    </div>
  )
}

export default (T2);
