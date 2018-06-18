import React from 'react';
import Typography from 'material-ui/Typography';
import Contract from 'components/Contract';

const T4 = () => {

  const textStyle = {

  }

  const contractStyle = {
    margin: 'auto',
    position: 'absolute',
    left: '0%',
    top: '40%',
  }


  const title = 'At the beginning of each hand, you will be assigned a \
            contract consisting of a number (the level) and a suit. \
            Your goal is to make your contract by taking the level + 6 number of tricks.'
  const body = 'In this example, the contract is 1 Spade. That means to make the contract \
                  you must take 1+6, or 7 tricks.'
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

export default (T4);
