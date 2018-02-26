import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom';

import Button from 'material-ui/Button';
var _ = require('lodash');

class BottomHand extends React.Component {

  // componentDidMount()  {
  //   console.log(ReactDOM.findDOMNode(this.refs.container).style);
  //   console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.container)).getPropertyValue("padding"));
  // }

  render() {

    const cards = []
    // show player's cards without ordering
    const hand = this.props.hand
    // const hand = {'spades': "AKQJ", 'hearts': "AKQ",'diamonds': "AKQ", 'clubs': "AKQ"}


    for (var i = 0; i < hand['spades'].length; i++) {
        cards.push( <Card card={hand['spades'][i]+ 'S' }  />)
    }
    for (var i = 0; i < hand['hearts'].length; i++) {
        cards.push( <Card card={hand['hearts'][i]+ 'H' }  />)
    }
    for (var i = 0; i < hand['clubs'].length; i++) {
              cards.push( <Card card={hand['clubs'][i]+ 'C'}  />)
          }
    for (var i = 0; i < hand['diamonds'].length; i++) {
        cards.push( <Card ref={"container"} card={hand['diamonds'][i]+ 'D'} />)
    }


    // const cards = []
    // for (var i = 0; i < 13; i++) {
    //     cards.push(<img className='card' src={require('cardsJS/cards/KS.svg')}/>)
    // }
    // console.log(cards[0])
    // console.log(<Card card='AH' />)

    return (
      <div>
      <p className='hand hhand-compact active-hand'>
        {cards}
      </p>
      <Button component={props => <Link to="/card" {...props} /> }>
            Test
      </Button>
      </div>
    )

  }
}
// <div className='hand' data-hand='flow: horizontal; spacing: 0.2; width: 110'>
// <div className='hand hhand-compact active-hand'>
// {cards}
export default connect(mapStateToProps, mapDispatchToProps)(BottomHand);

// key={_.uniqueId()}
