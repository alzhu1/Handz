import React from 'react';
import _ from 'lodash';

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

      let src = require('../images/SuitSymbols/' + suit + '.svg')
      return  (
                <img src={src} style={styles}/>
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
