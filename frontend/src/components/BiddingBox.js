import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';

class BiddingBox extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };
    if (this.props.special_phase === 'ask_strain'
             && this.props.declarer === this.props.seat){
      return(
        <div>
          <Button variant="raised" onClick={() =>
              {this.props.chooseStrainThunk('NT')}}>
              NoTrump
          </ Button>
          <Button variant="raised" color="primary" onClick={() =>
              {this.props.chooseStrainThunk('S')}}>
              Spades
          </ Button>
          <Button variant="raised" color="secondary" onClick={() =>
              {this.props.chooseStrainThunk('H')}}>
              Hearts
          </ Button>
          <Button variant="raised" color="primary" onClick={() =>
              {this.props.chooseStrainThunk('C')}}>
              Clubs
          </ Button>
          <Button variant="raised" color="secondary" onClick={() =>
              {this.props.chooseStrainThunk('D')}}>
              Diamonds
          </ Button>
        </div>
      )
    }
    else if (this.props.direction_to_act === this.props.seat &&
        this.props.contract == '' && this.props.special_phase === '') {
            return (
              <div style={styles}>
                  <div>It&#39;s your bid!</div>
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
    else {
      return <div />
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingBox);
