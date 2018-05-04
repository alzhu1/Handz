import React from 'react';
import Typography from 'material-ui/Typography';
import {Link} from 'react-router-dom';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import Button from 'material-ui/Button';

const T12= () => {

  const textStyle = {

  }


  const title = 'You are now ready to play some Handz!'

  return (
    <div>
      <Typography style={textStyle}>
        {title}
      </Typography>
      <Button component={props => <Link to="/table" {...props} /> }
          onClick={() => {this.props.createTableThunk('single')}}>
            Play!
      </Button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(T12);
