import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import ButtonBase from 'material-ui/ButtonBase';

class BiddingBox extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };

    return (
          <div style={styles}>
              <ButtonBase>
                  Pass
              </ ButtonBase>
              <ButtonBase>
                  1
              </ ButtonBase>
              <ButtonBase>
                  2
              </ ButtonBase>
           </ div>
         )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BiddingBox);
