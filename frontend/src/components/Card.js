import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class Card extends React.Component {

  constructor(){
    super()
    this.state = {
      width: '70px'
    };
  }

  componentWillMount() {
      this.updateDimensions(this);
  }
  componentDidMount() {
      window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  updateDimensions() {
    let update_width  = window.innerWidth/10
    this.setState({ width: update_width + 'px'});
  }

  render() {

    if (this.props.card === '') {
      return <div />
    }
    // let src = require('../images/acbl/' + this.props.card + '.png')
    let styles = {
      width: this.state.width,
    };

    console.log(this.state.width)

    return (
      <img className= 'card'
      style={styles}
      src={require('cardsJS/cards/'+ this.props.card + '.svg')}
      onClick={() => {this.props.playCardThunk(this.props.card)}} />
    )
  }
}

//  <img src={src} style={defaults}
//  onClick={() => {this.props.playCardThunk(this.props.card)}}
// />

export default connect(mapStateToProps, mapDispatchToProps)(Card);
