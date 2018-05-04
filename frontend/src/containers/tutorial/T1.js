import React from 'react';
import Typography from 'material-ui/Typography';

const T1 = () => {

  const textStyle = {
  }

  const title = 'Welcome to Handz!'
  const body = 'This tutorial will show you how to play Handz,\
              a simplified take on contract bridge.'

  return (
    <div>
      <Typography style={textStyle}>
        {title}
      </Typography>
      <Typography style={textStyle}>
        {body}
      </Typography>
    </div>
  )
}

export default T1;
