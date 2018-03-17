import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class TricksArea extends React.Component {

  render() {
    const handClass = "hand hhand-compact"
    var tricks = [];
    var rotate_style;

    for (var i = 0; i < this.props.trick_string.length; i++) {
        let firstChild = (i===0)
        if (this.props.trick_string[i]==='W' || this.props.trick_string[i]==='E'){
          rotate_style= {
            transform: 'rotate(90deg)',
            marginBottom:  window.innerWidth/-100 - 4 + 'px',
          }
        }
        else {
          rotate_style= {
            transform: 'rotate(0deg)',
          }
        }
        tricks.push(<Card card={'Blue_Back'}
        parentClass={handClass} firstChild={firstChild}
        addStyle={rotate_style}/>)
    }

    return (
          <div className={handClass}>
            {tricks}
          </div>
      )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TricksArea);
