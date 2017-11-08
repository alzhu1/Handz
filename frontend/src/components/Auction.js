import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';


class Auction extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };

    return <div style={styles}>
              Auction goes here
           </ div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
