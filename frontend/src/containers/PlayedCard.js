import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {Motion, spring, presets} from 'react-motion';


class PlayedCard extends React.Component {

  constructor(){
    super()
    this.state = {
    };
  }

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

  isTrickEmpty(trick) {
    return (trick['north'].length + trick['south'].length + trick['east'].length + trick['west'].length === 0)
  }

  render(){
    let seat = this.playedCardDirection(this.props.position, this.props.seat)
    var grid_column;
    var grid_row;
    var inital_x = 0;
    var inital_y = 0;

    if (this.props.position === 'top'){
      grid_column = '2 / 3'
      grid_row = '1 / 2'
      inital_y = -200
    }
    else if (this.props.position === 'left'){
      grid_column = '1 / 2'
      grid_row = '2 / 3'
      inital_x = -200
    }
    else if (this.props.position === 'right'){
      grid_column = '3 / 4'
      grid_row = '2 / 3'
      inital_x = 200
    }
    else if (this.props.position === 'bottom'){
      grid_column = '2 / 3'
      grid_row = '3 / 4'
      inital_y = 200
    }

    let style = {
      margin: 'auto',
      gridColumn: grid_column,
      gridRow: grid_row
    }

    const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}
    var trick;

    if (this.isTrickEmpty(this.props.prev_trick)) {
      console.log('trick 1')
      trick = this.props.trick
    }
    else if (this.isTrickEmpty(this.props.trick)) {
      console.log('trick 2')
      trick = this.props.prev_trick
    }
    else {
      console.log('trick 3')
      trick = this.props.trick
    }

    console.log('prev trick')
    console.log(this.props.trick)
    console.log(this.isTrickEmpty(this.props.trick))
    console.log(this.props.trick)
    console.log(this.props.prev_trick)
    console.log(trick)

    return (
      <div style={style}>
        <Motion style={{x: spring(trick[seat]!== '' ? 0 : inital_x, presets.stiff),
                        y: spring(trick[seat]!== '' ? 0 : inital_y, presets.stiff),
                    }}>
          {({x,y}) =>
            <Card className='card' card={trick[seat]}
            addStyle={{
              WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}/>
          }
        </Motion>
      </div>
    )
  }
}

// <Motion style={
//               {x: spring(this.props.trick[seat]!== '' ? 0 : -200, presets.stiff)},
//               {y: spring(this.props.trick[seat]!== '' ? 0 : -200, presets.stiff)}
//             }>
//   {({x,y}) =>
//     <Card className='card' card={this.props.trick[seat]}
//     motionStyle={{
//       WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
//       transform: `translate3d(${x}px, ${y}px, 0)`,
//       margin: 'auto',
//       gridColumn: grid_column,
//       gridRow: grid_row
//     }}/>
//   }
// </Motion>

export default connect(mapStateToProps, mapDispatchToProps)(PlayedCard);
