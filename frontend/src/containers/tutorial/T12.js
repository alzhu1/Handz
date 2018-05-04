import React from 'react';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';

class T12 extends React.Component {


  // resetGame = () => {
  //   this.props.createTableThunk('single')
  //   this.handleClose()
  // }

  render() {
    const textStyle = {

    }
    const title = 'You are now ready to play some Handz!'

    return (
      <div>
        <Typography style={textStyle}>
          {title}
        </Typography>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(T12);
