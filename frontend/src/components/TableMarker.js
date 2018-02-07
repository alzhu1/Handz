import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class TableMarker extends React.Component {

  handStrength = (hcp) => {
    if (hcp < 5) {
      return '--'
    }
    else if (hcp < 9) {
      return '-'
    }
    else if (hcp < 12) {
      return '0'
    }
    else if (hcp < 17) {
      return '+'
    }
    else {
      return '++'
    }
  }

  render() {

    return (
      <div>
          N:{this.handStrength(this.props.point_counts['north'])}
          S:{this.handStrength(this.props.point_counts['south'])}
          E:{this.handStrength(this.props.point_counts['east'])}
          W:{this.handStrength(this.props.point_counts['west'])}

      </ div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableMarker);
