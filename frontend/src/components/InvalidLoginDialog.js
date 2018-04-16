import React from 'react';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class InvalidLoginDialog extends React.Component {
  state = {
    open: true,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
    this.props.resetLogin()
  };

  render() {
    return (
      <div>
          <Dialog
            open={this.state.open}
            transition={Transition}
            keepMounted
            onRequestClose={this.handleRequestClose}
          >
            <DialogTitle>{"Username In Use"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Try a different username
              </DialogContentText>
            </DialogContent>
          </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvalidLoginDialog);
