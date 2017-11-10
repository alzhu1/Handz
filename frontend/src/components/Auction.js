import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';


class Auction extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };

    return <div style={styles}>
              {this.props.auction}
           </ div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
