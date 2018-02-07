import React from 'react';
import Card from 'components/Card';
import SuitSymbol from 'components/SuitSymbol';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

var _ = require('lodash');

class Suit extends React.Component {

  render() {
    const cards = []
    // // show player's cards without ordering
    // if (this.props.seat === this.props.direction || this.props.seat === ''){
    //   const hand = this.props.hand
    //
    //   for (var i = 0; i < hand['spades'].length; i++) {
    //       cards.push( <Card card={hand['spades'][i]+ 'S' }
    //                         key={_.uniqueId()}/>)
    //   }
    //   for (var i = 0; i < hand['hearts'].length; i++) {
    //       cards.push( <Card card={hand['hearts'][i]+ 'H' }
    //                         key={_.uniqueId()}/>)
    //   }
    //   for (var i = 0; i < hand['clubs'].length; i++) {
    //             cards.push( <Card card={hand['clubs'][i]+ 'C' }
    //                               key={_.uniqueId()}/>)
    //         }
    //   for (var i = 0; i < hand['diamonds'].length; i++) {
    //       cards.push( <Card card={hand['diamonds'][i]+ 'D' }
    //                         key={_.uniqueId()}/>)
    //   }
    // }

    // show dummy's cards
    if (this.props.show_dummy && this.props.direction === this.props.dummy){
      const suit_hand = this.props.dummy_hand[this.props.suit]
      cards.push(<SuitSymbol suit={this.props.suit} key={_.uniqueId()}/>)
      for (var i = 0; i < suit_hand.length; i++) {
        cards.push( <Card card={suit_hand[i] + this.props.suit[0].toUpperCase()}
                            card_seat = {this.props.direction}
                            key={_.uniqueId()}/>)
      }

    }
    // other player's cards, face down
    else {
      cards.push(<SuitSymbol suit={this.props.suit} key={_.uniqueId()}/>)
      const suit_len = this.props.other_hands[this.props.direction][this.props.suit]
      for (var i = 0; i < suit_len; i++) {
          cards.push( <Card card={'Blue_Back'}
                            key={_.uniqueId()}/>)
      }

    }

    return (
      <div className="hand hhand-compact">
        {cards}
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suit);
