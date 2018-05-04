import React from 'react';
import EstablishedCard from 'containers/EstablishedCard';

class TricksArea extends React.Component {

  render() {
    const handClass = "hand hhand-compact"
    var tricks = [];
    var rotateStyle;

    for (var i = 0; i < this.props.trick_string.length; i++) {
        let lastTrick = (i===this.props.trick_string.length - 1)
        if (this.props.trick_string[i]==='W' || this.props.trick_string[i]==='E'){
          rotateStyle= {
            transform: 'rotate(90deg)',
            marginBottom:  window.innerWidth/-100 - 4 + 'px',
          }
        }
        else {
          rotateStyle= {
            transform: 'rotate(0deg)',
          }
        }

        tricks.push(<EstablishedCard lastTrick={lastTrick} parentClass={handClass}
          addStyle={rotateStyle}/>)
    }

    return (
          <div className={handClass}>
            {tricks}
          </div>
      )
    }
}


export default (TricksArea);
