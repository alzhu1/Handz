import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import SuitSymbol from 'components/SuitSymbol';

import _ from 'lodash';

class TopHand extends React.Component {

  render() {

    const spades = []
    const hearts = []
    const clubs = []
    const diamonds = []
    // show player's cards without ordering
    if (this.props.dummy === this.props.direction && this.props.show_dummy){
        const hand = this.props.dummy_hand

        for (var i = 0; i < hand['spades'].length; i++) {
            spades.push(<Card card={hand['spades'][i]+ 'S' }
                              key={_.uniqueId()}/>)
        }
        for (var i = 0; i < hand['hearts'].length; i++) {
            hearts.push(<Card card={hand['hearts'][i]+ 'H' }
                              key={_.uniqueId()}/>)
        }
        for (var i = 0; i < hand['clubs'].length; i++) {
            clubs.push(<Card card={hand['clubs'][i]+ 'C' }
                                    key={_.uniqueId()}/>)
              }
        for (var i = 0; i < hand['diamonds'].length; i++) {
            diamonds.push(<Card card={hand['diamonds'][i]+ 'D' }
                              key={_.uniqueId()}/>)
        }
      }
    else {
        const hand = this.props.other_hands[this.props.direction]

        for (var i = 0; i < hand['spades']; i++) {
            spades.push(<Card card={'Blue_Back'}
                            key={_.uniqueId()}/>)
        }
        for (var i = 0; i < hand['hearts']; i++) {
            hearts.push(<Card card={'Blue_Back'}
                            key={_.uniqueId()}/>)
        }
        for (var i = 0; i < hand['clubs']; i++) {
            clubs.push(<Card card={'Blue_Back'}
                            key={_.uniqueId()}/>)
              }
        for (var i = 0; i < hand['diamonds']; i++) {
            diamonds.push(<Card card={'Blue_Back'}
                            key={_.uniqueId()}/>)
        }
      }



    return (
      <div>
        <div>
          <SuitSymbol suit='spade' key={_.uniqueId()}/>
          <SuitSymbol suit='heart' key={_.uniqueId()}/>
          <SuitSymbol suit='diamond' key={_.uniqueId()} />
          <SuitSymbol suit='club' key={_.uniqueId()} />
        </div>
        <div className="hand vhand-compact active-hand" >
          {spades}
        </div>
        <div className="hand vhand-compact active-hand">
          {hearts}
        </div>
        <div className="hand vhand-compact active-hand">
          {diamonds}
        </div>
        <div className="hand vhand-compact active-hand">
          {clubs}
        </div>
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHand);
