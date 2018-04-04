import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';

import {Link} from 'react-router-dom';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ScoringModal extends React.Component {
  constructor(){
    super()
    this.state = {
      open: false,
    };
  }

  // componentWillMount() {
  //   this.handleOpen()
  //   console.log('componentWillMount')
  //   console.log(this.props.trick_string.length)
  //     if (this.props.trick_string.length === 1) {
  //       console.log('handleopen')
  //       this.handleOpen()
  //     }
  //     else {
  //       this.handleClose()
  //     }
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.trick_string !== this.props.trick_string && nextProps.length == 13) {
      this.handleOpen()
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log('nextProps')
  //   console.log(nextProps)
  //   console.log(this.props.trick_string.length)
  //   return this.props.trick_string == nextProps.trick_string;
  // }


  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  resetGame() {
    this.props.leaveSeatThunk(this.props.seat)
    this.props.createTableThunk('single')
    this.handleClose()
  }



  render() {

    const { classes } = this.props;

    let modalStyle = {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };

    console.log('it updated!')
    console.log(this.state.open)

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button component={props => <Link to="/table" {...props} /> }
                onClick={() => {this.resetGame()}}>
                  Play Again!
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

ScoringModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ScoringModal));
