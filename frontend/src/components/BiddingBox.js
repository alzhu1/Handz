import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import SuitSymbol from 'components/SuitSymbol';

import Button from 'material-ui/Button';

class BiddingBox extends React.Component {

  fullSeat(abbr) {
    switch(abbr) {
      case 'S':
        return 'South'
      case 'N':
        return 'North'
      case 'W':
        return 'West'
      case 'E':
        return 'East'
      default:
          break;
    }
  }

  render() {

    if (this.props.special_phase === 'ask_strain'
             && this.props.declarer === this.props.seat){
      return(
        <div>
          <div>
          <Button variant="raised" onClick={() =>
              {this.props.chooseStrainThunk('N')}}>
              NoTrump
          </ Button>
          </div>
          <div>
          <Button variant="raised" color="primary" onClick={() =>
              {this.props.chooseStrainThunk('S')}}>
              Spades
          </ Button>
          <Button variant="raised" color="secondary" onClick={() =>
              {this.props.chooseStrainThunk('H')}}>
              Hearts
          </ Button>
          </div>
          <div>
          <Button variant="raised" color="primary" onClick={() =>
              {this.props.chooseStrainThunk('C')}}>
              Clubs
          </ Button>
          <Button variant="raised" color="secondary" onClick={() =>
              {this.props.chooseStrainThunk('D')}}>
              Diamonds
          </ Button>
          </div>
        </div>
      )
    }
    // since only single player in effect for now, no bidding box
    else if (this.props.direction_to_act === this.props.seat &&
        this.props.contract === '' && this.props.special_phase === 'bidding') {

          let styles = {
            alignSelf: 'center'
          }

            return (
              <div style={styles}>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('P')}}>
                      Pass
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('1')}}>
                      1
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('2')}}>
                      2
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('3')}}>
                      3
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('4')}}>
                      4
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('5')}}>
                      5
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('6')}}>
                      6
                  </ Button>
                  <Button onClick={() =>
                      {this.props.makeBidThunk('7')}}>
                      7
                  </ Button>
               </div>
           )
         }
    else if (this.props.contract !== ''){

      let styles = {
        marginLeft: '20px'
      }

      let font_styles = {
        fontSize: 'xx-large',
        fontWeight: 'bold'
      }


      if (this.props.contract.charAt(1) === 'N'){
        return (
          <div style={styles}>
            <span style={font_styles}>{this.props.contract.charAt(0)}NT </span>
            by {this.fullSeat(this.props.contract.charAt(2))}
          </div>
        )
      }
      else {
        return (
          <div style={styles}>
            <span style={font_styles}>{this.props.contract.charAt(0)}</span>
            <SuitSymbol suit={this.props.contract.charAt(1)}/>
            by {this.fullSeat(this.props.contract.charAt(2))}
          </div>
        )
      }

    }
    else {
      return <div />
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingBox);
