import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import ButtonBase from 'material-ui/ButtonBase';

class BiddingBox extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };

    if (this.props.direction_to_act === this.props.seat &&
        this.props.contract == '') {
          if (this.props.special_phase === '') {
            return (
              <div style={styles}>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('P')}}>
                      Pass
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('1')}}>
                      1
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('2')}}>
                      2
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('3')}}>
                      3
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('4')}}>
                      4
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('5')}}>
                      5
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('6')}}>
                      6
                  </ ButtonBase>
                  <ButtonBase onClick={() =>
                      {this.props.makeBidThunk('7')}}>
                      7
                  </ ButtonBase>
               </div>
           )
         }
         else if (this.props.special_phase === 'ask_strain'){
           return(
             <div>
               <ButtonBase onClick={() =>
                   {this.props.chooseStrainThunk('NT')}}>
                   NoTrump
               </ ButtonBase>
               <ButtonBase onClick={() =>
                   {this.props.chooseStrainThunk('S')}}>
                   Spades
               </ ButtonBase>
               <ButtonBase onClick={() =>
                   {this.props.chooseStrainThunk('H')}}>
                   Hearts
               </ ButtonBase>
               <ButtonBase onClick={() =>
                   {this.props.chooseStrainThunk('C')}}>
                   Clubs
               </ ButtonBase>
               <ButtonBase onClick={() =>
                   {this.props.chooseStrainThunk('D')}}>
                   Diamonds
               </ ButtonBase>
             </div>
           )
         }
         else {
           return <div />
         }
    }
    else {
      return <div />
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingBox);
