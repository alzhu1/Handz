import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import _ from 'lodash';

class Card extends React.Component {
  constructor(){
    super()
    this.state = {
      width: '70px'
    };
  }

  suitName(suit) {
    switch(suit) {
      case 'S':
        return 'spades'
      case 'H':
        return 'hearts'
      case 'C':
        return 'clubs'
      case 'D':
        return 'diamonds'
      default:
          return '';
    }
  }

  isCardinHand(card,hand){
    let r = card[0]
    let s = card[1]
    let t = hand[this.suitName(s)]
    if (t.indexOf(r) > -1) {
      return true
    }
    return false
  }

  componentWillMount() {
      this.updateDimensions(this);
  }
  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions() {
    let update_width  = window.innerWidth/23 + 10
    this.setState({ width: update_width + 'px'});
  }

  render() {

    const suit = this.props.card.charAt(1)
    var cardClass = 'card'

    // set to hover only if
    if (this.suitName(suit).length > 0) {
      // dummy's turn to play and it is a valid card to play
      if (this.props.dummy === this.props.direction_to_act && this.isCardinHand(this.props.card,this.props.dummy_hand)){
        if ((this.props.suit_led === suit && this.props.dummy_hand[this.suitName(suit)] != '') ||
              (this.props.suit_led === '') || (this.props.dummy_hand[this.suitName(this.props.suit_led)].length === 0))
        {
            cardClass = 'cardHover'
        }
      }
      // declarer's turn to play and it is a valid card to play
      else if (this.props.declarer === this.props.direction_to_act && this.isCardinHand(this.props.card,this.props.hand)){
        if ((this.props.suit_led === suit && this.props.hand[this.suitName(suit)] != '') ||
              (this.props.suit_led === '') || (this.props.hand[this.suitName(this.props.suit_led)].length === 0))
        {
            cardClass = 'cardHover'
        }
      }
    }

    if (this.props.card === '') {
      return <div />
    }
    // let src = require('../images/acbl/' + this.props.card + '.png')
    let styles = {
      width: this.state.width,
    }

    if (this.props.addStyle !== undefined){
      styles =_.merge(styles, this.props.addStyle);
    }

    if (this.props.parentClass !== undefined && this.props.parentClass.includes('hhand-compact')
        && this.props.firstChild !== true){
      styles['marginLeft'] = -window.innerWidth/33 + 'px'
    }
    else if (this.props.parentClass !== undefined && this.props.parentClass.includes('vhand-compact')
        && this.props.firstChild !== true){
      styles['marginTop'] = -window.innerWidth/23 + 'px'
    }

    // console.log(this.state.width)

    return (
      <img className= {cardClass}
      style={styles}
      src={require('cardsJS/cards/'+ this.props.card + '.svg')}
      onClick={() => {this.props.playCardThunk(this.props.card)}}/>
    )
  }
}

//  <img src={src} style={defaults}
//  onClick={() => {this.props.playCardThunk(this.props.card)}}
// />

export default connect(mapStateToProps, mapDispatchToProps)(Card);
