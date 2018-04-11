import React from 'react';
import PlayedCard from 'containers/PlayedCard';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class PlayedCardArea extends React.Component {

  constructor(){
    super()
    this.state = {
      delay: '',
      trick: empty_trick
    };
  }



  componentWillReceiveProps(nextProps) {
    if(nextProps.trick != this.props.trick || nextProps.prev_trick != this.props.prev_trick) {
      if (this.didRobotLead(nextProps)) {
        this.setState({trick : empty_trick})
        setTimeout(function() {this.setState({trick : nextProps.trick})}.bind(this), 5000);
      }
      else {
        this.changeTrick(nextProps)
      }
    }
  }

  changeTrick(nextProps) {
    if (this.isTrickEmpty(nextProps.prev_trick)) {
      this.setState({trick : nextProps.trick})
    }
    else if (this.isTrickEmpty(nextProps.trick)) {
      this.setState({trick : nextProps.prev_trick})
      setTimeout(function() {this.setState({trick : nextProps.trick})}.bind(this), 5000);
    }
    else {
      this.setState({trick : nextProps.trick})
    }
  }

  didRobotLead(nextProps) {
    if (nextProps.trick['west']!='' && nextProps.trick['north']=='' &&
        nextProps.trick['east']=='' && nextProps.trick['south']=='') {
      console.log(nextProps.trick)
      return true
    }
    else if (nextProps.trick['east']!='' && nextProps.trick['north']=='' &&
              nextProps.trick['west']=='' && nextProps.trick['south']=='') {
      console.log(nextProps.trick)
      return true
    }
    else {
      return false
    }
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

  findFirstSeat() {
    if (this.props.trick['west']=='' && this.props.trick['north']!=''){
      return 'north'
    }
    else if (this.props.trick['north']=='' && this.props.trick['east']!=''){
      return 'east'
    }
    else if (this.props.trick['east']=='' && this.props.trick['south']!=''){
      return 'south'
    }
    else if (this.props.trick['south']=='' && this.props.trick['west']!=''){
      return 'west'
    }
    else {
      return ''
    }
  }

  findSeatNumber(first_seat, seat) {
      switch(first_seat) {
        case '':
          return 0
        case 'south':
          switch (seat) {
            case 'north':
              return 3
            case 'east':
              return 4
            case 'west':
              return 2
            case 'south':
              return 1
          }
        case 'north':
          switch (seat) {
            case 'north':
              return 1
            case 'east':
              return 2
            case 'west':
              return 4
            case 'south':
              return 3
          }
        case 'west':
          switch (seat) {
            case 'north':
              return 2
            case 'east':
              return 3
            case 'west':
              return 1
            case 'south':
              return 4
          }
        case 'east':
          switch (seat) {
            case 'north':
              return 4
            case 'east':
              return 1
            case 'west':
              return 3
            case 'south':
              return 2
          }
      }
  }

  isTrickEmpty(trick) {
    return (trick['north'].length + trick['south'].length + trick['east'].length + trick['west'].length === 0)
  }

  render() {
    var top_seat = this.playedCardDirection('top', this.props.seat)
    var bottom_seat = this.playedCardDirection('bottom', this.props.seat)
    var left_seat = this.playedCardDirection('left', this.props.seat)
    var right_seat = this.playedCardDirection('right', this.props.seat)

    let first_seat = this.findFirstSeat()

    var top_seat_z_index = this.findSeatNumber(first_seat, top_seat)
    var bottom_seat_z_index = this.findSeatNumber(first_seat, bottom_seat)
    var left_seat_z_index = this.findSeatNumber(first_seat, left_seat)
    var right_seat_z_index = this.findSeatNumber(first_seat, right_seat)


    let trick = this.state.trick

    return (
          <div className={this.state.delay}>
            <PlayedCard position='top' card={trick[top_seat]} z_index={top_seat_z_index}/>
            <PlayedCard position='left' card={trick[left_seat]} z_index={left_seat_z_index}/>
            <PlayedCard position='right' card={trick[right_seat]} z_index={right_seat_z_index}/>
            <PlayedCard position='bottom' card={trick[bottom_seat]} z_index={bottom_seat_z_index}/>
          </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayedCardArea);
