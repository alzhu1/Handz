import React from 'react';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class Card extends React.Component {
  render() {
    let src = require('../images/acbl/' + this.props.card + '.png')
    let defaults = {
      height: '50px',
      width: '30px',
      backgroundColor: 'clear',
      // position:'relative',
      // left:this.props.left
    };
    return (
            <img src={src} style={defaults}
            onClick={() =>{this.props.playCardThunk(this.props.card)}}
           />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
