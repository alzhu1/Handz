import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui-icons/ArrowBack';
import {Link} from 'react-router-dom';

class BackButton extends React.Component {

  render() {

    let styles = {
      position: 'fixed',
      bottom: '0',
      right: '0',
    }

    return(
      <div style={styles}>
      <IconButton component={props => <Link to="" {...props} /> }>
        <ArrowBack />
      </IconButton>
      </div>
    )
  }


}

export default connect(mapStateToProps, mapDispatchToProps)(BackButton);
