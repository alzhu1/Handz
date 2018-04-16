import React from 'react';

class Test2 extends React.Component {

  gridRowColumn(c,r){
    return ({
      gridColumn: c,
      gridRow: r,
    })
  }

  render() {
    let auctionStyles = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      gridGap: '5px'
    }


    return (
      <div style={auctionStyles}>
        <div style={this.gridRowColumn(1,1)}>N</div>
        <div style={this.gridRowColumn(2,1)}>E</div>
        <div style={this.gridRowColumn(3,1)}>S</div>
        <div style={this.gridRowColumn(4,1)}>W</div>
      </div>
    )
  }
}

export default Test2;
