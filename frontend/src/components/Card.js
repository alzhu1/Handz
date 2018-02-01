import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import card from 'cardsJS';

var cardJS = require('cardsJS');

class Card extends React.Component {
  render() {
    if (this.props.card == '') {
      return <div />
    }
    // let src = require('../images/acbl/' + this.props.card + '.png')
    let src = require('../images/cards/' + this.props.card + '.svg')
    let defaults = {
      height: '15%',
      width: '15%',
      backgroundColor: 'clear',
    };

    return (
      <img className='card' style={defaults} src={src} />
    )
  }
}

//  <img src={src} style={defaults}
//  onClick={() => {this.props.playCardThunk(this.props.card)}}
// />

export default connect(mapStateToProps, mapDispatchToProps)(Card);
