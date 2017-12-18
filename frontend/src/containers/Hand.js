import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Suit from 'containers/Suit';

import 'css/table.css'
import Button from 'material-ui/Button';
import ButtonBase from 'material-ui/Button';

import {empty_hand} from 'redux/reducers/reducers';

var _ = require('lodash');

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

      // var cardlist = [];
      //
      // if (this.props.hand === empty_hand || this.props.position !== 'bottom') {
      //
      //     for (var i = 0, len = 13; i < len; i++) {
      //         cardlist.push('blue_back');
      //     }
      //     var card_len = 13
      //
      // }
      // else{
      //
      //     // create list of cards e.g. 9S4D...
      //     cardlist = this.createCardList(this.props.hand)
      //     var card_len = (this.props.hand['spades'].length +
      //                     this.props.hand['hearts'].length +
      //                     this.props.hand['diamonds'].length +
      //                     this.props.hand['clubs'].length)
      //
      //
      // }

      // console.log(this.props.position)


      // const cards = cardlist.map((card) => {
      //   return <Card
      //             card={card}
      //             key={_.uniqueId()}
      //           />
      // })
      let cardinal = this.buttonDirection(this.props.position, this.props.seat)

      if (this.props.position === 'bottom') {
        return(
          <div>
            <Suit suit='all' direction={cardinal}/>
            <ButtonBase onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              {cardinal}
              {this.props.table_seats[cardinal]}
            </ButtonBase>
          </div>
        )
      }
      else {
        return (
          <div>
            <Suit suit='spades' direction={cardinal}/>
            <Suit suit='hearts' direction={cardinal}/>
            <Suit suit='diamonds' direction={cardinal}/>
            <Suit suit='clubs' direction={cardinal}/>
            <ButtonBase onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
              {cardinal}
              {this.props.table_seats[cardinal]}
            </ButtonBase>
          </div>
        )
      }
      // return (
      //   <div className={this.props.className}>
      //     <Card card={this.props.trick[cardinal]} key={_.uniqueId()}/>
      //     {cards}
      //     <ButtonBase onClick={()=> this.props.takeSeatThunk(cardinal,this.props.table_id)}>
      //     {cardinal}
      //     </ButtonBase>
      //   </div>
      // )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand);
