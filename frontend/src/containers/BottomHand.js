import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

var _ = require('lodash');

class BottomHand extends React.Component {

  render() {

    const cards = []
    // show player's cards without ordering
    const hand = this.props.hand


    for (var i = 0; i < hand['spades'].length; i++) {
        cards.push( <Card card={hand['spades'][i]+ 'S' } key={_.uniqueId()}></Card>)
    }
    for (var i = 0; i < hand['hearts'].length; i++) {
        cards.push( <Card card={hand['hearts'][i]+ 'H' } key={_.uniqueId()}></Card>)
    }
    for (var i = 0; i < hand['clubs'].length; i++) {
              cards.push( <Card card={hand['clubs'][i]+ 'C'} key={_.uniqueId()}></Card>)
          }
    for (var i = 0; i < hand['diamonds'].length; i++) {
        cards.push( <Card card={hand['diamonds'][i]+ 'D'} key={_.uniqueId()}></Card>)
    }


    // const cards = []
    // for (var i = 0; i < 13; i++) {
    //     cards.push(<img className='card' src={require('cardsJS/cards/KS.svg')}/>)
    // }
    // console.log(cards)

    return (
      <div className='hand hhand-compact active-hand' >
        {cards}
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomHand);

// key={_.uniqueId()}
