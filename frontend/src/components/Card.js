import React from 'react';

export default class Card extends React.Component {
  render() {
    let src = require('../images/acbl/' + this.props.card + '.png')
    let defaults = {
      height: '50px',
      width: '30px',
      backgroundColor: 'clear',
      // position:'relative',
      // left:this.props.left
    };
    return <img src={src} style={defaults}/>
  }
}
