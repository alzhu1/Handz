import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';

import BottomHand from 'containers/BottomHand';
import TopHand from 'containers/TopHand';
import SideHand from 'containers/SideHand';

class Hand extends React.Component {

    // createCardList(hand) {
    //   var cardlist = {
    //   };
    //   for (var i = 0, len = hand.spades.length; i < len; i++) {
    //       cardlist["spades"].push(this.props.hand.spades[i] + 'S');
    //   }
    //   for (var i = 0, len = hand.hearts.length; i < len; i++) {
    //       cardlist["hearts"].push(this.props.hand.hearts[i] + 'H');
    //   }
    //   for (var i = 0, len = hand.clubs.length; i < len; i++) {
    //       cardlist["diamonds"].push(hand.clubs[i] + 'C');
    //   }
    //   for (var i = 0, len = hand.diamonds.length; i < len; i++) {
    //       cardlist["clubs"].push(hand.diamonds[i] + 'D');
    //   }
    //   return cardlist
    // }

    buttonDirection(position, seat) {

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

    handStrength = (hcp) => {
      if (hcp < 5) {
        return '--'
      }
      else if (hcp < 9) {
        return '-'
      }
      else if (hcp < 12) {
        return '0'
      }
      else if (hcp < 17) {
        return '+'
      }
      else {
        return '++'
      }
    }

    render() {

      let cardinal = this.buttonDirection(this.props.position, this.props.seat)
      var body;

      if (this.props.position === 'bottom') {
         body =
          (
            <div>
            <BottomHand/>
            <Button onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              <p align="left">
                {cardinal}: {this.props.table_seats[cardinal]}
                <br/>
                HCP: {this.props.point_counts[cardinal]}
              </p>
            </Button>
            </div>)

      }
      else if (this.props.position === 'top') {
         body =
          (
            <div>
            <TopHand direction={cardinal} />
            <Button
              onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              <p align="left">
                {cardinal}: {this.props.table_seats[cardinal]}
                <br/>
                HCP: {this.props.point_counts[cardinal]}
              </p>
            </Button>
            </div>)

      }
      else if (this.props.position === 'left') {
         body =
          (<div>
              <SideHand direction={cardinal}/>
              <Button onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              <p align="left">
                {cardinal}: {this.props.table_seats[cardinal]}
                <br/>
                HCP: {this.props.point_counts[cardinal]}
              </p>
              </Button>
            </div>)

      }
      else if (this.props.position === 'right') {
        let styles={transform:  'scaleX(-1)'}
         body =
          (<div style={styles}>
              <SideHand direction={cardinal}/>
              <Button size='large'
                style={styles}
                onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
                <p align="left">
                  {cardinal}: {this.props.table_seats[cardinal]}
                  <br/>
                  HCP: {this.props.point_counts[cardinal]}
                </p>
              </Button>
            </div>)
      }
      else{
        console.log('error')
      }

      return (
        <div>
          {body}
        </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand);
