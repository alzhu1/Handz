import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';


class Auction extends React.Component {

  gridRowColumn(c,r){
    return ({
      gridColumn: c,
      gridRow: r
    })
  }

  declarerN(direction){
    if (direction === 'north'){
      return 2
    }
    else if (direction === 'south'){
      return 0
    }
    else if (direction === 'east'){
      return 3
    }
    else if (direction === 'west'){
      return 1
    }
  }

  render() {
    // since only single player in effect for now, no auction
    if (false && this.props.contract === ''){

      var bids = []
      var declarer_n = this.declarerN(this.props.declarer)

      let auctionStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(4, 1fr)',
        gridGap: '5px',
        fontSize: '30px',
        fontFamily: 'Arial, Helvetica, sans-serif'
      }

      for (var i = 0; i < this.props.auction.length; i++) {
          let c = (i % 4 + declarer_n) + 1
          let r = Math.floor(i/4) + 2
          bids.push(
            <div style={this.gridRowColumn(c,r)}>
              {this.props.auction[i]}
            </div>
          )
      }


      // if last 3 bids were not passes, have a question mark
      if (this.props.auction.length > 3 &&
          (this.props.auction[this.props.auction.length - 1] === 'P' &&
          this.props.auction[this.props.auction.length - 2] === 'P' &&
          this.props.auction[this.props.auction.length - 3] === 'P')){
            // empty
          }
      else if (this.props.auction.length === 0){
        bids.push(
          <div style={this.gridRowColumn(0,2)}>
            ?
          </div>
        )
      }
      else {
        let i = this.props.auction.length
        let c = (i % 4 + declarer_n) + 1
        let r = Math.floor(i/4) + 2
        bids.push(
          <div style={this.gridRowColumn(c,r)}>
            ?
          </div>
        )
      }

      return(
        <div>
          <div style={auctionStyles}>
            <div style={this.gridRowColumn(1,1)}>S</div>
            <div style={this.gridRowColumn(2,1)}>W</div>
            <div style={this.gridRowColumn(3,1)}>N</div>
            <div style={this.gridRowColumn(4,1)}>E</div>
            {bids}
          </div>
        </div>
      )
    }
    else {
      return (<div> </div>)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
