import React from 'react';
import PlayedCard from 'containers/PlayedCard';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class PlayedCardArea extends React.Component {

  constructor(){
    super()
    this.timer = null;
    this.state = {
      delay: '',
      trick: empty_trick,
      collapse: false
    };
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = e => {
    if(!ReactDOM.findDOMNode(this).contains(e.target)) {
      if (this.isTrickFull(this.state.trick)){
        // console.log('clicked outside!')
        // this.collapseTrick()
      }
    }
  }

  collapseTrick() {
    // console.log('collapse trick')
    this.setState({collapse : true})
    setTimeout(function() {this.setState({trick : empty_trick})}.bind(this), 1000);
    setTimeout(function() {this.setState({trick : this.props.trick})}.bind(this), 1500);
    setTimeout(function() {this.setState({collapse : false})}.bind(this), 1000);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.trick !== this.props.trick || nextProps.prev_trick !== this.props.prev_trick) {
      // if trick is not full, uncollapse
      // this.setState({collapse : false})
      // if (!this.isTrickFull(this.state.trick)){
      //   this.setState({collapse : false})
      // }
      clearTimeout(this.timer);

      if (this.didRobotLead(nextProps) && nextProps.trick_string.length > 0) {
        // this.setState({trick : nextProps.trick})
        this.setState({trick : nextProps.prev_trick})
        this.timer = setTimeout(function() {this.collapseTrick()}.bind(this), 2000);
        // this.setState({trick : empty_trick})
        // setTimeout(function() {this.setState({trick : nextProps.trick})}.bind(this), 1000);
      }
      else {
        this.changeTrick(nextProps)
      }

    }
  }



  changeTrick(nextProps) {
    // first trick only
    if (this.isTrickEmpty(nextProps.prev_trick)) {
      // console.log('1')
      this.setState({trick : nextProps.trick})

    }
    else if (this.isTrickEmpty(nextProps.trick)) {
      // console.log('2')
      // console.log(nextProps.prev_trick)
      // this.setState({trick : nextProps.trick})
      this.setState({trick : nextProps.prev_trick})
      this.timer = setTimeout(function() {this.collapseTrick()}.bind(this), 2000);
      // console.log(this.state.trick)
      // setTimeout(function() {this.setState({trick : nextProps.trick})}.bind(this), 1000);
    }
    else {
      // console.log('3')
      this.setState({trick : nextProps.trick})
    }
  }

  didRobotLead(nextProps) {
    if (nextProps.trick['west']!=='' && nextProps.trick['north']==='' &&
        nextProps.trick['east']==='' && nextProps.trick['south']==='') {
      // console.log(nextProps.trick)
      return true
    }
    else if (nextProps.trick['east']!=='' && nextProps.trick['north']==='' &&
              nextProps.trick['west']==='' && nextProps.trick['south']==='') {
      // console.log(nextProps.trick)
      return true
    }
    else {
      return false
    }
  }

  seatAbbr(s){
    switch(s) {
      case 'S':
        return 'south'
      case 'E':
        return 'east'
      case 'W':
        return 'west'
      case 'N':
        return 'north'
    }
  }

  seatDirection(position, seat) {

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

  seatPosition(direction, seat) {

    switch(seat) {
      case '':
      case 'south':
        switch (direction) {
          case 'north':
            return 'top'
          case 'south':
            return 'bottom'
          case 'west':
            return 'left'
          case 'east':
            return 'right'
        }
      case 'north':
        switch (direction) {
          case 'south':
            return 'top'
          case 'north':
            return 'bottom'
          case 'east':
            return 'left'
          case 'west':
            return 'right'
        }
      case 'west':
        switch (direction) {
          case 'east':
            return 'top'
          case 'west':
            return 'bottom'
          case 'north':
            return 'left'
          case 'south':
            return 'right'
        }
      case 'east':
        switch (direction) {
          case 'west':
            return 'top'
          case 'east':
            return 'bottom'
          case 'south':
            return 'left'
          case 'north':
            return 'right'
        }
    }
  }


  findFirstSeat() {
    if (this.props.trick['west']==='' && this.props.trick['north']!==''){
      return 'north'
    }
    else if (this.props.trick['north']==='' && this.props.trick['east']!==''){
      return 'east'
    }
    else if (this.props.trick['east']==='' && this.props.trick['south']!==''){
      return 'south'
    }
    else if (this.props.trick['south']==='' && this.props.trick['west']!==''){
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

  isTrickFull(trick) {
    return (trick['north'].length + trick['south'].length + trick['east'].length + trick['west'].length === 8)
  }

  setZIndex(seat){
    let first_seat = this.findFirstSeat()
    var z = this.findSeatNumber(first_seat, seat)
    if (this.isTrickFull(this.state.trick)){
      if (seat === this.seatAbbr(this.props.trick_string[this.props.trick_string.length - 1])){
        z = z + 5
      }
    }
    return z
  }

  render() {
    var top_seat = this.seatDirection('top', this.props.seat)
    var bottom_seat = this.seatDirection('bottom', this.props.seat)
    var left_seat = this.seatDirection('left', this.props.seat)
    var right_seat = this.seatDirection('right', this.props.seat)

    var top_seat_z_index = this.setZIndex(top_seat)
    var bottom_seat_z_index = this.setZIndex(bottom_seat)
    var left_seat_z_index = this.setZIndex(left_seat)
    var right_seat_z_index = this.setZIndex(right_seat)

    let trick = this.state.trick
    let collapse = this.state.collapse
    let winner = this.seatPosition(this.seatAbbr(this.props.trick_string[this.props.trick_string.length - 1],this.props.seat),
                  this.props.seat)

    return (
        <div>
          <PlayedCard position='top' card={trick[top_seat]}
              zIndex={top_seat_z_index} collapse={collapse} winner={winner}/>
          <PlayedCard position='left' card={trick[left_seat]}
              zIndex={left_seat_z_index} collapse={collapse} winner={winner}/>
          <PlayedCard position='right' card={trick[right_seat]}
              zIndex={right_seat_z_index} collapse={collapse} winner={winner}/>
          <PlayedCard position='bottom' card={trick[bottom_seat]}
              zIndex={bottom_seat_z_index} collapse={collapse} winner={winner}/>
        </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayedCardArea);
