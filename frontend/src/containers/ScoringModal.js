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
    if(nextProps.trick_string !== this.props.trick_string && nextProps.trick_string.length === 13) {
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
    this.props.leaveTableThunk(this.props.seat)
    this.props.createTableThunk('single')
    this.handleClose()
  }

  tricksTaken() {
    if (this.props.seat === 'east' || this.props.seat === 'west') {
      return this.props.trick_string.split("E").length + this.props.trick_string.split("W").length - 2
    }
    else {
      return this.props.trick_string.split("N").length + this.props.trick_string.split("S").length - 2
    }
  };

  calcScore() {
    let tricks = this.tricksTaken()
    let level = this.props.contract.charAt(0) * 1
    if (tricks >= level + 6){
      return (tricks - 6) * 30
    }
    else {
      return (level + 6 - tricks) * -50
    }
  }




  render() {
    const tricks_needed = this.props.contract.charAt(0) * 1 + 6

    const modal_text1 = 'You have taken ' + this.tricksTaken() + ' tricks.'

    const make_contract_text = 'Congratulations, you made your contract!'

    const went_down_text = ('Sorry, you didn&#39;t make your contract. You needed ' +
                (tricks_needed - this.tricksTaken()) + ' more tricks!')

    const { classes } = this.props;

    let modalStyle = {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };

    var modal_text2;

    if (this.tricksTaken() >= tricks_needed) {
      modal_text2 = make_contract_text
    }
    else {
      modal_text2 = went_down_text
    }

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography variant="title" id="title">
              {modal_text1}
            </Typography>
            <Typography variant="subheading" id="description">
              {modal_text2}
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
