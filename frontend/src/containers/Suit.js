import React from 'react';
import Card from 'components/Card';
import SuitSymbol from 'components/SuitSymbol';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

var _ = require('lodash');

class Suit extends React.Component {

  render() {
    const cards = []
    // show player's cards without ordering
    if (this.props.seat === this.props.direction || this.props.seat === ''){
      const hand = this.props.hand
      let left = 25

      for (var i = 0; i < hand['spades'].length; i++) {
          cards.push( <Card card={hand['spades'][i]+ 'S' }
                            key={_.uniqueId()}
                            left={left} />)
          left = left - 25
      }
      for (var i = 0; i < hand['hearts'].length; i++) {
          cards.push( <Card card={hand['hearts'][i]+ 'H' }
                            key={_.uniqueId()}
                            left={left} />)
          left = left - 25
      }
      for (var i = 0; i < hand['clubs'].length; i++) {
                cards.push( <Card card={hand['clubs'][i]+ 'C' }
                                  key={_.uniqueId()}
                                  left={left} />)
                left = left - 25
            }
      for (var i = 0; i < hand['diamonds'].length; i++) {
          cards.push( <Card card={hand['diamonds'][i]+ 'D' }
                            key={_.uniqueId()}
                            left={left} />)
          left = left - 25
      }
    }
    // show dummy's cards
    else if (this.props.show_dummy && this.props.direction === this.props.dummy){
      const suit_hand = this.props.dummy_hand[this.props.suit]
      cards.push(<SuitSymbol suit={this.props.suit} key={_.uniqueId()}/>)
      let left = 25
      for (var i = 0; i < suit_hand.length; i++) {
        cards.push( <Card card={suit_hand[i] + this.props.suit[0].toUpperCase()}
                            key={_.uniqueId()}
                            left={left} />)
          left = left - 25
      }

    }
    // other player's cards, face down
    else {
      cards.push(<SuitSymbol suit={this.props.suit} key={_.uniqueId()}/>)
      const suit_len = this.props.other_hands[this.props.direction][this.props.suit]
      let left = 25
      for (var i = 0; i < suit_len; i++) {
          cards.push( <Card card={'blue_back'}
                            key={_.uniqueId()}
                            left={left} />)
          left = left - 25
      }

    }

    return (
      <div>
        {cards}
      </div>
    )

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Suit);
