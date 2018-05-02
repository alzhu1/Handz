import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';


class BottomHand extends React.Component {

  // componentDidMount()  {
  //   console.log(ReactDOM.findDOMNode(this.refs.container).style);
  //   console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.container)).getPropertyValue("padding"));
  // }

  render() {

    const cards = []
    // show player's cards without ordering
    const hand = this.props.hand
    console.log(this.props.hand)
    // const hand = {'spades': "AKQJ", 'hearts': "AKQ",'diamonds': "AKQ", 'clubs': "AKQ"}
    const handClass = "hand hhand-compact active-hand"
    var firstChild = true

    for (var i = 0; i < hand['spades'].length; i++) {
        cards.push( <Card card={hand['spades'][i]+ 'S'}
        parentClass={handClass} firstChild={firstChild}  />)
        if (firstChild) {
          firstChild = false
        }
    }
    for (var i = 0; i < hand['hearts'].length; i++) {
        cards.push( <Card card={hand['hearts'][i]+ 'H'}
        parentClass={handClass} firstChild={firstChild}  />)
        if (firstChild) {
          firstChild = false
        }
    }
    for (var i = 0; i < hand['clubs'].length; i++) {
        cards.push( <Card card={hand['clubs'][i]+ 'C'}
        parentClass={handClass} firstChild={firstChild}/>)
        if (firstChild) {
          firstChild = false
        }
    }
    for (var i = 0; i < hand['diamonds'].length; i++) {
        cards.push( <Card ref={"container"} card={hand['diamonds'][i]+ 'D'}
        parentClass={handClass} firstChild={firstChild} />)
        if (firstChild) {
          firstChild = false
        }
    }


    // const cards = []
    // for (var i = 0; i < 13; i++) {
    //     cards.push(<img className='card' src={require('cardsJS/cards/KS.svg')}/>)
    // }
    // console.log(cards[0])
    // console.log(<Card card='AH' />)

    return (
      <div>
      <p className={handClass}>
        {cards}
      </p>
      </div>
    )

  }
}
// <div className='hand' data-hand='flow: horizontal; spacing: 0.2; width: 110'>
// <div className='hand hhand-compact active-hand'>
// {cards}
export default connect(mapStateToProps, mapDispatchToProps)(BottomHand);

// key={_.uniqueId()}
