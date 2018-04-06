import React from 'react';
import Floater from 'react-floater';
import Card from 'components/Card';
import PlayedCard from 'containers/PlayedCard';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class PreviousTrick extends React.Component {

  playedCardDirection(position, seat) {

    switch(seat) {
      case '':
      case 'south':
        switch (position) {
          case 'top':
            return 'north'
          case 'bottom':
            return 'south'
          case 'left':
            return 'west'
          case 'right':
            return 'east'
        }
      case 'north':
        switch (position) {
          case 'top':
            return 'south'
          case 'bottom':
            return 'north'
          case 'left':
            return 'east'
          case 'right':
            return 'west'
        }
      case 'west':
        switch (position) {
          case 'top':
            return 'east'
          case 'bottom':
            return 'west'
          case 'left':
            return 'north'
          case 'right':
            return 'south'
        }
      case 'east':
        switch (position) {
          case 'top':
            return 'west'
          case 'bottom':
            return 'east'
          case 'left':
            return 'south'
          case 'right':
            return 'north'
        }
    }
  }


  render() {
    let styles_top = {
      gridColumn: '2 / 3',
      gridRow: '1 / 2'
    }
    let styles_left = {
      gridColumn: '1 / 2',
      gridRow: '2 / 3'
    }
    let styles_right = {
      gridColumn: '3 / 4',
      gridRow:  '2 / 3'
    }
    let styles_bottom = {
      gridColumn: '2 / 3',
      gridRow: '3 / 4'
    }

    let wrapper_styles = {
      wrapper :
        {
          cursor: 'default',
          display: 'inline-block',
        }
    }

    // let played_card_styles = {
    //   display: 'grid',
    //   gridTemplateColumns: 'repeat(3, 1fr)',
    //   gridTemplateRows: 'repeat(3, 1fr)',
    // }

    var seat = this.props.seat

    return (
      <div className='card' style={{display:'inline-block'}}>
        <Floater styles={wrapper_styles}
          content={
            <div className='PlayedCardArea2'>
            <Card card={this.props.prev_trick[this.playedCardDirection('top',seat)]} addStyle={styles_top}/>
            <Card card={this.props.prev_trick[this.playedCardDirection('left',seat)]} addStyle={styles_left}/>
            <Card card={this.props.prev_trick[this.playedCardDirection('right',seat)]} addStyle={styles_right}/>
            <Card card={this.props.prev_trick[this.playedCardDirection('bottom',seat)]} addStyle={styles_bottom}/>
            </div>
          }
          event="hover"
          placement="top"
        >
          <Card card={'Blue_Back'}
          establishedCard={true}
          lastTrick={true}
          parentClass={this.props.parentClass}
          addStyle={this.props.addStyle}/>
        </Floater>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PreviousTrick);
