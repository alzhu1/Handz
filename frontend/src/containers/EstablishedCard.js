import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';


class EstablishedCard extends React.Component {

  render(){

    return (
      <Card card={'Blue_Back'}
      parentClass={this.props.parentClass}
      establishedCard={true}
      lastTrick={this.props.lastTrick}
      addStyle={this.props.addStyle}/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstablishedCard);
