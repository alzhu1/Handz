import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import SuitSymbol from 'components/SuitSymbol';
import Tooltip from 'material-ui/Tooltip';

class Contract extends React.Component {

  fullSeat(abbr) {
    switch(abbr) {
      case 'S':
        return 'South'
      case 'N':
        return 'North'
      case 'W':
        return 'West'
      case 'E':
        return 'East'
      default:
          break;
    }
  }

  render () {

  let styles = {
    marginLeft: '20px'
  }

  let font_styles = {
    fontSize: 'xx-large',
    fontWeight: 'bold'
  }

  let tooltip_text = 'You must take ' + (this.props.contract.charAt(0) * 1 + 6) + ' tricks to make your contract!'

  var body;

  if (this.props.contract.charAt(1) === 'N'){
    body = (<div style={styles}>
            <span style={font_styles}>{this.props.contract.charAt(0)}NT </span>
            by {this.fullSeat(this.props.contract.charAt(2))}
          </div>)
  }
  else {
    body = (<div style={styles}>
            <span style={font_styles}>{this.props.contract.charAt(0)}</span>
            <SuitSymbol suit={this.props.contract.charAt(1)}/>
            by {this.fullSeat(this.props.contract.charAt(2))}
          </div>)
  }
  return (
    <Tooltip id="tooltip-top-start" title={tooltip_text} placement="top-start">
      {body}
    </Tooltip>
  )
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
