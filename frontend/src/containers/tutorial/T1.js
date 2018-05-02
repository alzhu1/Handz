import React from 'react';
import Typography from 'material-ui/Typography';

const T1 = () => {

  const textStyle = {
    fontSize: 'xx-large'
  }

  const title = 'Welcome to Handz!'
  const body = 'This tutorial will show you how to play Handz,\
              a simplified take on contract bridge.'

  return (
    <div>
      <Typography style={textStyle} variant="title">
        {title}
      </Typography>
      <Typography style={textStyle} variant="title">
        {body}
      </Typography>
    </div>
  )
}

export default T1;
