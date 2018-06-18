import React from 'react';
import _ from 'lodash';
import spadesuit from 'images/SuitSymbols/spade.svg';
import heartsuit from 'images/SuitSymbols/heart.svg';
import diamondsuit from 'images/SuitSymbols/diamond.svg';
import clubsuit from 'images/SuitSymbols/club.svg';

export default class SuitSymbol extends React.Component {

    suitName(suit) {
      switch(suit) {
        case 'S':
          return 'spade'
        case 'H':
          return 'heart'
        case 'C':
          return 'club'
        case 'D':
          return 'diamond'
        case 'N':
          return 'notrump'
        default:
            break;
      }
    }

    render() {

      var suit;

      if (this.props.suit.length === 1){
        suit = this.suitName(this.props.suit)
      }
      else {
        suit = this.props.suit
      }

      if (suit[suit.length - 1] === 's') {
          suit = suit.substring(0, suit.length - 1);
      }

      let styles = {
        height: '100%',
        width: '50px'
      };

      if (this.props.additionalStyles !== undefined){
        styles =_.merge(styles, this.props.additionalStyles);
      }

      // let src = require('../images/SuitSymbols/' + suit + '.svg')
      var suit_src;
      if (suit == 'spade') {
        suit_src = spadesuit
      }
      else if (suit == 'heart') {
        suit_src = heartsuit
      }
      else if (suit == 'diamond') {
        suit_src = diamondsuit
      }
      else if (suit == 'club') {
        suit_src = clubsuit
      }
      return  (
                <img src={suit_src} style={styles}/>
      )
    }
}
//
// export default class SuitSymbol extends React.Component {
//     render() {
//       var suit = this.props.suit
//       if (suit[suit.length - 1] === 's') {
//           suit = suit.substring(0, suit.length - 1);
//       }
//       let styles = {
//         height: '24px',
//         width: '24px',
//         backgroundColor: 'clear'
//       };
//       let src = require('../images/acbl/' + suit + '.png')
//       return  (
//                 <img src={src} style={styles}/>
//       )
//     }
// }
