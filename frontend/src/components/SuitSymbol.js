import React from 'react';

export default class SuitSymbol extends React.Component {
    render() {
      var suit = this.props.suit
      if (suit[suit.length - 1] === 's') {
          suit = suit.substring(0, suit.length - 1);
      }
      let styles = {
        height: '24px',
        width: '24px',
        backgroundColor: 'clear'
      };
      let src = require('../images/acbl/' + suit + '.png')
      return  (
                <img src={src} style={styles}/>
      )
    }
}
