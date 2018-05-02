import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import SuitSymbol from 'components/SuitSymbol';
import TopHand from 'containers/TopHand';

class TopHandContainer extends React.Component {

  constructor(){
    super()
    this.state = {
      handClass: 'hand vhand-compact'
    };
  }

  componentWillUpdate() {
    if (this.props.dummy === this.props.direction && this.props.show_dummy &&
      this.state.handClass === 'hand vhand-compact'){
      this.setState({ handClass: 'hand vhand-compact active-hand'});
      // console.log('active!')
    }
    else if (this.props.dummy !== this.props.direction  &&
      this.state.handClass === 'hand vhand-compact active-hand') {
      this.setState({ handClass: 'hand vhand-compact'});
      // console.log('not active!')
    }
  }

  render() {

      let styles1 = {
        display: 'flex',
        justifyContent: 'space-between'
      }

      let styles2 = {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: '1vw'
      }

    return (
      <div style={styles1}>
        <TopHand show_dummy={this.props.show_dummy}
                is_dummy={this.props.dummy === this.props.direction}
                hand={this.props.dummy_hand}
                hand_dist={this.props.other_hands[this.props.direction]}
                hand_class={this.state.handClass}/>
      </div>
    )
  }
}

// <div style={styles2}>
//   <SuitSymbol suit='spade' />
//   <SuitSymbol suit='heart' />
//   <SuitSymbol suit='diamond' />
//   <SuitSymbol suit='club' />
// </div>


export default connect(mapStateToProps, mapDispatchToProps)(TopHandContainer);
