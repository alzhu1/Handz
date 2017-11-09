import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import ButtonBase from 'material-ui/ButtonBase';

class BiddingBox extends React.Component {
  render() {
    let styles = {
      alignSelf: 'center'
    };

    if (this.props.dealer === this.props.seat) {
      return (
            <div style={styles}>
                <ButtonBase onClick={() =>
                    {this.props.makeBidThunk('P', this.props.table_id)}}>
                    Pass
                </ ButtonBase>
                <ButtonBase>
                    1
                </ ButtonBase>
                <ButtonBase>
                    2
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
