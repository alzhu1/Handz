import React from 'react';
import Typography from 'material-ui/Typography';
import Contract from 'components/Contract';

const T8 = () => {

  const textStyle = {

  }

  const contractStyle = {
    margin: 'auto',
    position: 'absolute',
    left: '0%',
    top: '40%',
  }

  const title = 'The contract you are assigned in the beginning will also \
                indicate what the trump suit is.'
  const body = 'Playing a card in the trump suit will win the trick \
                even if it’s not the same suit as the first played card.'
  const contract = '1SS'

  return (
    <div>
      <Typography style={textStyle}>
        {title}
      </Typography>
      <div style={contractStyle}>
        <Contract contract={contract}/>
      </div>
      <Typography style={textStyle}>
        {body}
      </Typography>
    </div>
  )
}

export default (T8);
