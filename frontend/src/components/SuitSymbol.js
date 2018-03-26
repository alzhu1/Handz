import React from 'react';
import _ from 'lodash';

export default class SuitSymbol extends React.Component {
    render() {
      var suit = this.props.suit
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
