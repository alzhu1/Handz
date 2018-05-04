import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import Button from 'material-ui/Button';
import Contract from 'components/Contract';

class BiddingBox extends React.Component {

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
      return <Contract contract={this.props.contract}/>
    }
    else {
      return <div />
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingBox);
