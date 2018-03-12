import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Suit from 'containers/Suit';

import ButtonBase from 'material-ui/Button';

import BottomHand from 'containers/BottomHand';
import TopHand from 'containers/TopHand';
import SideHand from 'containers/SideHand';

import {empty_hand} from 'redux/reducers/reducers';


class Hand extends React.Component {

    createCardList(hand) {
      var cardlist = {
      };
      for (var i = 0, len = hand.spades.length; i < len; i++) {
          cardlist["spades"].push(this.props.hand.spades[i] + 'S');
      }
      for (var i = 0, len = hand.hearts.length; i < len; i++) {
          cardlist["hearts"].push(this.props.hand.hearts[i] + 'H');
      }
      for (var i = 0, len = hand.clubs.length; i < len; i++) {
          cardlist["diamonds"].push(hand.clubs[i] + 'C');
      }
      for (var i = 0, len = hand.diamonds.length; i < len; i++) {
          cardlist["clubs"].push(hand.diamonds[i] + 'D');
      }
      return cardlist
    }

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

    render() {

      let cardinal = this.buttonDirection(this.props.position, this.props.seat)

      let styles = {
      };

      if (this.props.position === 'bottom') {
        var body =
          (
            <div>
            <BottomHand styles={styles}/>
            <ButtonBase onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              <div style={{fontWeight: "bold"}}>{cardinal[0]}:</div>
              {this.props.table_seats[cardinal]}
            </ButtonBase>
            </div>)

      }
      else if (this.props.position === 'top') {
        var body =
          (
            <div>
            <TopHand direction={cardinal}/>
            <ButtonBase onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              <div style={{fontWeight: "bold"}}>{cardinal[0]}:</div>
              {this.props.table_seats[cardinal]}
            </ButtonBase>
            </div>)

      }
      else {
        console.log('side hand')
        var body =
          (<div>
            <SideHand direction={cardinal}/>
            <ButtonBase onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              <div style={{fontWeight: "bold"}}>{cardinal[0]}:</div>
              {this.props.table_seats[cardinal]}
            </ButtonBase>
            </div>)

      }

      return (
        <div>
          {body}
        </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand);
