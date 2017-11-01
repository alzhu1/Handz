import React from 'react';

export default class Card extends React.Component {
  render() {
    let src = require('../images/acbl/' + this.props.card + '.png')
    let defaults = {
      height: 75,
      width: 50,
      backgroundColor: 'white'
    };
    return <img src={src} style={{...defaults}}/>
  }
}
