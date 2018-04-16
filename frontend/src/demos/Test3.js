import React from 'react';
import Card from 'components/Card';
import PlayedCard from 'containers/PlayedCard';

class Test3 extends React.Component {

  render() {
    let styles = {
      margin: 'auto',
      gridColumn: '2 / 3',
      gridRow: '1/ 2'
    }

    let styles2 = {
      margin: 'auto',
      gridColumn: '1 / 2',
      gridRow: '2/ 3'
    }

    let styles3 = {
      margin: 'auto',
      gridColumn: '2 / 3',
      gridRow: '3/ 4'
    }

    return (
          <div className='PlayedCardArea2'>
          <PlayedCard position='top'/>
          <Card motionStyle={styles2} card='KS' />
          <Card motionStyle={styles3} card='QS' />
          </div>
      )
    }
}


export default Test3;
