import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

var _ = require('lodash');

class DummyHand extends React.Component {

  render() {

    const spades = []
    const hearts = []
    const clubs = []
    const diamonds = []
    // show player's cards without ordering
    const hand = this.props.dummy_hand

    for (var i = 0; i < hand['spades'].length; i++) {
        spades.push( <Card card={hand['spades'][i]+ 'S' }
                          key={_.uniqueId()}/>)
    }
    for (var i = 0; i < hand['hearts'].length; i++) {
        hearts.push( <Card card={hand['hearts'][i]+ 'H' }
                          key={_.uniqueId()}/>)
    }
    for (var i = 0; i < hand['clubs'].length; i++) {
              clubs.push( <Card card={hand['clubs'][i]+ 'C' }
                                key={_.uniqueId()}/>)
          }
    for (var i = 0; i < hand['diamonds'].length; i++) {
        diamonds.push( <Card card={hand['diamonds'][i]+ 'D' }
                          key={_.uniqueId()}/>)
    }



    return (
      <div>
        <div className="hand vhand-compact active-hand" >
          {spades}
        </div>
        <div className="hand vhand-compact active-hand" >
          {hearts}
        </div>
        <div className="hand vhand-compact active-hand" >
          {diamonds}
        </div>
        <div className="hand vhand-compact active-hand" >
          {clubs}
        </div>
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DummyHand);
