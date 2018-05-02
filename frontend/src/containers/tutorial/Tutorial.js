import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import T1 from 'containers/tutorial/T1';
import T2 from 'containers/tutorial/T2';
import T3 from 'containers/tutorial/T3';


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '80vw',
    height: '80vh',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit,
  },
});

class Tutorial extends React.Component {
  constructor(){
    super()
    this.state = {
      open: false,
      n: 1,
    };
  }

  // componentWillMount() {
  //   const hand = {'spades': "AKQJ", 'hearts': "AKQ",'diamonds': "AKQ", 'clubs': "AKQ"}
  //   const dummy_hand = {'spades': "234", 'hearts': "234",'diamonds': "234", 'clubs': "2345"}
  //   this.props.getHand(hand)
  //   this.props.getDummyHand(dummy_hand)
  //   this.props.getDeclarer('south')
  //   this.props.showDummy()
  // }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ n: 1 });
    this.setState({ open: false });
  };

  incrementN = () => {
    this.setState({ n: this.state.n+1 });
  };

  tutorialPage = (n) => {
    switch(n) {
      case 1:
        return <T1/>
      case 2:
        return <T2/>
      case 3:
        return <T3/>
      case 4:
        return <div/>
      case 5:
        this.setState({ n: 1 });
        this.handleClose()
      default:
          break;
    }
  }



  render() {
    const { classes } = this.props;
    let modalStyle = {
      top: `50%`,
      left: `50%`,
      transform: `translate(-50%, -50%)`,
    };

    let nextButtonStyles = {
      position: 'fixed',
      bottom: '0',
      right: '0',
    }

    let exitButtonStyles = {
      position: 'fixed',
      bottom: '0',
      left: '0',
    }

    console.log(this.state.n)
    console.log(this.tutorialPage(this.state.n))


    return (
      <div>
        <Button onClick={this.handleOpen}>Tutorial</Button>
        <Modal open={this.state.open}>
          <div style={modalStyle} className={classes.paper}>
            {this.tutorialPage(this.state.n)}
            <Button style={nextButtonStyles} onClick={() => {this.incrementN()}}>
              Next
            </Button>
            <Button style={exitButtonStyles} onClick={() => {this.handleClose()}}>
              Exit
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

Tutorial.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Tutorial));
