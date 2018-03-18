import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import SuitSymbol from 'components/SuitSymbol';

var _ = require('lodash');

class SideHand extends React.Component {

  render() {

    const spades = []
    const hearts = []
    const clubs = []
    const diamonds = []
    const handClass = "hand hhand-compact"
    // show player's cards without ordering
    if (this.props.dummy === this.props.direction && this.props.show_dummy){
        const hand = this.props.dummy_hand

        for (var i = 0; i < hand['spades'].length; i++) {
            let firstChild = (i===0)
            spades.push(<Card card={hand['spades'][i]+ 'S' }
            parentClass={handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['hearts'].length; i++) {
            let firstChild = (i===0)
            hearts.push(<Card card={hand['hearts'][i]+ 'H' }
            parentClass={handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['clubs'].length; i++) {
            let firstChild = (i===0)
            clubs.push(<Card card={hand['clubs'][i]+ 'C' }
            parentClass={handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['diamonds'].length; i++) {
            let firstChild = (i===0)
            diamonds.push(<Card card={hand['diamonds'][i]+ 'D' }
            parentClass={handClass} firstChild={firstChild}/>)
        }
      }
    else {
        const hand = this.props.other_hands[this.props.direction]

        for (var i = 0; i < hand['spades']; i++) {
            let firstChild = (i===0)
            spades.push(<Card card={'Blue_Back'}
            parentClass={handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['hearts']; i++) {
            let firstChild = (i===0)
            hearts.push(<Card card={'Blue_Back'}
            parentClass={handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['clubs']; i++) {
            let firstChild = (i===0)
            clubs.push(<Card card={'Blue_Back'}
            parentClass={handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['diamonds']; i++) {
            let firstChild = (i===0)
            diamonds.push(<Card card={'Blue_Back'}
            parentClass={handClass} firstChild={firstChild}/>)
        }
      }


    return (
      <div>
        <div>
          <SuitSymbol suit='spade'/>
          <div className={handClass} >
            {spades}
          </div>
        </div>
        <div>
          <SuitSymbol suit='heart'/>
          <div className={handClass}>
            {hearts}
          </div>
        </div>
        <div>
          <SuitSymbol suit='diamond'/>
          <div className={handClass}>
            {diamonds}
          </div>
        </div>
        <div>
          <SuitSymbol suit='club'/>
          <div className={handClass}>
            {clubs}
          </div>
        </div>
      </div>
    )

  }
}

// <SuitSymbol suit='club' key={_.uniqueId()} />

export default connect(mapStateToProps, mapDispatchToProps)(SideHand);
