import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import SuitSymbol from 'components/SuitSymbol';

import _ from 'lodash';

class TopHand extends React.Component {

  constructor(){
    super()
    this.state = {
      handClass: 'hand vhand-compact'
    };
  }

  componentWillUpdate() {
    if (this.props.dummy === this.props.direction && this.props.show_dummy &&
      this.state.handClass === 'hand vhand-compact'){
      this.setState({ handClass: 'hand vhand-compact active-hand'});
      console.log('active!')
    }
    else if (this.props.dummy != this.props.direction  &&
      this.state.handClass === 'hand vhand-compact active-hand') {
      this.setState({ handClass: 'hand vhand-compact'});
      console.log('not active!')
    }
  }

  render() {
    const spades = []
    const hearts = []
    const clubs = []
    const diamonds = []

    // show player's cards without ordering
    if (this.props.dummy === this.props.direction && this.props.show_dummy){
        const hand = this.props.dummy_hand

        let addStyles = {
          cursor: 'pointer',
        }

        for (var i = 0; i < hand['spades'].length; i++) {
            let firstChild = (i===0)
            spades.push(<Card card={hand['spades'][i]+ 'S' } addStyle={addStyles}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['hearts'].length; i++) {
            let firstChild = (i===0)
            hearts.push(<Card card={hand['hearts'][i]+ 'H' } addStyle={addStyles}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['clubs'].length; i++) {
            let firstChild = (i===0)
            clubs.push(<Card card={hand['clubs'][i]+ 'C' } addStyle={addStyles}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['diamonds'].length; i++) {
            let firstChild = (i===0)
            diamonds.push(<Card card={hand['diamonds'][i]+ 'D' } addStyle={addStyles}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
      }
    else {
        const hand = this.props.other_hands[this.props.direction]
        for (var i = 0; i < hand['spades']; i++) {
            let firstChild = (i===0)
            spades.push(<Card card={'Blue_Back'}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['hearts']; i++) {
            let firstChild = (i===0)
            hearts.push(<Card card={'Blue_Back'}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['clubs']; i++) {
            let firstChild = (i===0)
            clubs.push(<Card card={'Blue_Back'}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['diamonds']; i++) {
            let firstChild = (i===0)
            diamonds.push(<Card card={'Blue_Back'}
            parentClass={this.state.handClass} firstChild={firstChild}/>)
        }
      }

      let styles1 = {
        display: 'flex',
        justifyContent: 'space-between'
      }

      let styles2 = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '1vw'
      }


    return (
      <div>
        <div style={styles2}>
          <SuitSymbol suit='spade' />
          <SuitSymbol suit='heart' />
          <SuitSymbol suit='diamond' />
          <SuitSymbol suit='club' />
        </div>
        <div style={styles1}>
          <div className={this.state.handClass}>
            {spades}
          </div>
          <div className={this.state.handClass}>
            {hearts}
          </div>
          <div className={this.state.handClass}>
            {diamonds}
          </div>
          <div className={this.state.handClass}>
            {clubs}
          </div>
        </div>
      </div>
    )
  }
}

// <div style={styles}>
//   <SuitSymbol suit='spade' />
//   <SuitSymbol suit='heart' />
//   <SuitSymbol suit='diamond' />
//   <SuitSymbol suit='club' />
// </div>

export default connect(mapStateToProps, mapDispatchToProps)(TopHand);
