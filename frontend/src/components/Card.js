import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

import _ from 'lodash';

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
    let update_width  = window.innerWidth/23 + 10
    this.setState({ width: update_width + 'px'});
  }

  render() {

    if (this.props.card === '') {
      return <div />
    }
    // let src = require('../images/acbl/' + this.props.card + '.png')
    let styles = {
      width: this.state.width,
    }

    if (this.props.addStyle !== undefined){
      styles =_.merge(styles, this.props.addStyle);
    }

    if (this.props.parentClass !== undefined && this.props.parentClass.includes('hhand-compact')
        && this.props.firstChild !== true){
      styles['marginLeft'] = -window.innerWidth/33 + 'px'
    }
    else if (this.props.parentClass !== undefined && this.props.parentClass.includes('vhand-compact')
        && this.props.firstChild !== true){
      styles['marginTop'] = -window.innerWidth/23 + 'px'
    }

    // console.log(this.state.width)

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
