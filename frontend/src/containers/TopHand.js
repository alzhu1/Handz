import React from 'react';
import Card from 'components/Card';
import SuitSymbol from 'components/SuitSymbol';


class TopHand extends React.Component {

  render() {
    const spades = []
    const hearts = []
    const clubs = []
    const diamonds = []

    const hand_class = this.props.hand_class

    console.log('hand_dist')
    console.log(this.props.hand_dist)

    // show player's cards without ordering
    if (this.props.is_dummy && this.props.show_dummy){
        const hand = this.props.hand

        let addStyles = {
          cursor: 'pointer',
        }

        for (var i = 0; i < hand['spades'].length; i++) {
            let firstChild = (i===0)
            spades.push(<Card card={hand['spades'][i]+ 'S' } addStyle={addStyles}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['hearts'].length; i++) {
            let firstChild = (i===0)
            hearts.push(<Card card={hand['hearts'][i]+ 'H' } addStyle={addStyles}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['clubs'].length; i++) {
            let firstChild = (i===0)
            clubs.push(<Card card={hand['clubs'][i]+ 'C' } addStyle={addStyles}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['diamonds'].length; i++) {
            let firstChild = (i===0)
            diamonds.push(<Card card={hand['diamonds'][i]+ 'D' } addStyle={addStyles}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
      }
    else {
        const hand = this.props.hand_dist
        for (var i = 0; i < hand['spades']; i++) {
            let firstChild = (i===0)
            spades.push(<Card card={'Blue_Back'}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['hearts']; i++) {
            let firstChild = (i===0)
            hearts.push(<Card card={'Blue_Back'}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['clubs']; i++) {
            let firstChild = (i===0)
            clubs.push(<Card card={'Blue_Back'}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
        for (var i = 0; i < hand['diamonds']; i++) {
            let firstChild = (i===0)
            diamonds.push(<Card card={'Blue_Back'}
            parentClass={hand_class} firstChild={firstChild}/>)
        }
      }

      let styles1 = {
        // display: 'flex',
        // justifyContent: 'space-between'
      }

      let styles2 = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '1vw'
      }

    console.log(hand_class)


    return (
        <div style={styles1}>
          <div className={hand_class}>
            {spades}
          </div>
          <div className={hand_class}>
            {hearts}
          </div>
          <div className={hand_class}>
            {diamonds}
          </div>
          <div className={hand_class}>
            {clubs}
          </div>
        </div>
    )
  }
}

// <div style={styles2}>
//   <SuitSymbol suit='spade' />
//   <SuitSymbol suit='heart' />
//   <SuitSymbol suit='diamond' />
//   <SuitSymbol suit='club' />
// </div>


export default (TopHand);
