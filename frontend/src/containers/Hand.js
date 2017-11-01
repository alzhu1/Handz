import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
var _ = require('lodash');

class Hand extends React.Component {

    render() {

      var cardlist = [];

      if (this.props.hand === '') {

          for (var i = 0, len = 13; i < len; i++) {
              cardlist.push('blue_back');
          }
          
      }
      else{

          cardlist = [];
          // create list of cards e.g. 9S4D...
          for (var i = 0, len = this.props.hand.spades.length; i < len; i++) {
              cardlist.push(this.props.hand.spades[i] + 'S');
          }
          for (var i = 0, len = this.props.hand.hearts.length; i < len; i++) {
              cardlist.push(this.props.hand.hearts[i] + 'H');
          }
          for (var i = 0, len = this.props.hand.clubs.length; i < len; i++) {
              cardlist.push(this.props.hand.clubs[i] + 'C');
          }
          for (var i = 0, len = this.props.hand.diamonds.length; i < len; i++) {
              cardlist.push(this.props.hand.diamonds[i] + 'D');
          }
      }

      const cards = cardlist.map((card) => {
        return <Card
                card={card}
                key={_.uniqueId()}
                />
      })



      return (
        <div>
          {cards}
        </div>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand);
