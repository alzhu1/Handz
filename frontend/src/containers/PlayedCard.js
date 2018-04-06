import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {Motion, spring, presets} from 'react-motion';


class PlayedCard extends React.Component {


  render(){

    var top;
    var left;
    var inital_x = 0;
    var inital_y = 0;

    if (this.props.position === 'top'){
      left = '50%'
      top = '43%'
      inital_y = -200
    }
    else if (this.props.position === 'left'){
      left = '46%'
      top = '47%'
      inital_x = -200
    }
    else if (this.props.position === 'right'){
      left = '54%'
      top = '47%'
      inital_x = 200
    }
    else if (this.props.position === 'bottom'){
      left = '50%'
      top = '50%'
      inital_y = 200
    }

    let style = {
      margin: 'auto',
      position: 'absolute',
      left: left,
      top: top,
      zIndex: this.props.z_index,
    }



    return (
      <div style={style}>
        <Motion style={{x: spring(this.props.card !== '' ? 0 : inital_x, presets.stiff),
                        y: spring(this.props.card !== '' ? 0 : inital_y, presets.stiff),
                    }}>
          {({x,y}) =>
            <Card className='card' card={this.props.card}
            addStyle={{
              WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}/>
          }
        </Motion>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayedCard);
