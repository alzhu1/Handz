import React from 'react';
import Floater from 'react-floater';
import Card from 'components/Card';
import PlayedCard from 'containers/PlayedCard';
// import styled from 'styled-components';

export default class PopperExample extends React.Component {

  render(){

  let styles_top = {
    gridColumn: '2 / 3',
    gridRow: '1 / 2'
  }
  let styles_left = {
    gridColumn: '1 / 2',
    gridRow: '2 / 3'
  }
  let styles_right = {
    gridColumn: '3 / 4',
    gridRow:  '2 / 3'
  }
  let styles_bottom = {
    gridColumn: '2 / 3',
    gridRow: '3 / 4'
  }

    return (
      <div>
        <Floater
          content={
            <div className='PlayedCardArea2'>
            <Card card={'Blue_Back'} addStyle={styles_top}/>
            <Card card={'Blue_Back'} addStyle={styles_left}/>
            <Card card={'Blue_Back'} addStyle={styles_right}/>
            <Card card={'Blue_Back'} addStyle={styles_bottom}/>
            </div>
          }
          event="hover"
          placement="top"
        >
          <Card card={'Blue_Back'}
          establishedCard={true}
          lastTrick={true}/>
        </Floater>
      </div>
    );
  }
}

//
// class PopperExample extends React.Component {
//
//   render() {
//     return (
//       <Floater content="hi">
//         <Card card={'Blue_Back'}
//         establishedCard={true}
//         lastTrick={true}/>
//       </Floater>
//     )
//   }
// }
//
// export default PopperExample;
