import React from 'react';
import Card from 'components/Card';
import PreviousTrick from 'containers/PreviousTrick';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';


class EstablishedCard extends React.Component {

  render(){

    if (this.props.lastTrick) {

      return (
        <PreviousTrick
        parentClass={this.props.parentClass}
        addStyle={this.props.addStyle}/>
      )

    }
    else {

      return (
        <Card card={'Blue_Back'}
        parentClass={this.props.parentClass}
        establishedCard={true}
        addStyle={this.props.addStyle}/>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EstablishedCard);
