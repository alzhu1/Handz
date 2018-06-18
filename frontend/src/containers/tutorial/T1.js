import React from 'react';
import Typography from 'material-ui/Typography';
import SuitSymbol from 'components/SuitSymbol';

const T1 = () => {

  const textStyle = {
  }

  const title = 'Welcome to Handz!'
  const body = 'In this tutorial you’ll learn how to play a fun new card game.'

  // This tutorial will show you how to play Handz,\
  //             a simplified take on contract bridge.


  // Really dumb work around to get suitsymbol to load first time
  return (
    <div>
      <Typography style={textStyle}>
        {title}
      </Typography>
      <Typography style={textStyle}>
        {body}
      </Typography>
      <SuitSymbol suit={'S'} additionalStyles={{width: '0px'}}/>
    </div>
  )
}

export default T1;
