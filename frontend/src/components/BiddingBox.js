import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import ButtonBase from 'material-ui/ButtonBase';

class BiddingBox extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };

    if (this.props.bidder === this.props.seat) {
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
    else {
      return <div />
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingBox);
