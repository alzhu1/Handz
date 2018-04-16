import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {Motion, spring, presets} from 'react-motion';

class PlayedCard extends React.Component {

  winningTrickX(w) {

    switch (this.props.winner) {
      case 'top':
        return 0
      case 'bottom':
        return 0
      case 'left':
        return -w
      case 'right':
        return w
      default:
        return 0
    }

  }

  winningTrickY(h) {

    switch (this.props.winner) {
      case 'top':
        return -h
      case 'bottom':
        return h
      case 'left':
        return 0
      case 'right':
        return 0
      default:
        return 0
    }

  }

  render(){
    var p = 200
    var w = 75
    var h = 60
    var inital_x = 0;
    var inital_y = 0;
    var end_x = 0;
    var end_y = 0;


    if (!this.props.collapse){
      if (this.props.position === 'top'){
        inital_y = -p
        end_y = -h
      }
      else if (this.props.position === 'left'){
        inital_x = -p
        end_x = -w
      }
      else if (this.props.position === 'right'){
        inital_x = p
        end_x = w
      }
      else if (this.props.position === 'bottom'){
        inital_y = p
        end_y = h
      }
    }
    else{
      if (this.props.position === 'top'){
        inital_y = -h
        end_x = this.winningTrickX(w)
        end_y = this.winningTrickY(h)
      }
      else if (this.props.position === 'left'){
        inital_x = -w
        end_x = this.winningTrickX(w)
        end_y = this.winningTrickY(h)
      }
      else if (this.props.position === 'right'){
        inital_x = w
        end_x = this.winningTrickX(w)
        end_y = this.winningTrickY(h)
      }
      else if (this.props.position === 'bottom'){
        inital_y = h
        end_x = this.winningTrickX(w)
        end_y = this.winningTrickY(h)
      }
    }


    let styles = {
        margin: 'auto',
        position: 'absolute',
        left: '50%',
        top: '47%',
        zIndex: this.props.zIndex
    }

    return (
      <div style={styles}>
        <Motion style={{x: spring(this.props.card !== '' ? end_x : inital_x, presets.noWobble),
                        y: spring(this.props.card !== '' ? end_y : inital_y, presets.noWobble),
                    }}>
          {({x,y}) =>
            <Card className='card' card={this.props.card}
            addStyle={{
              WebkitTransform: `translate3d(${x}%, ${y}%, 0)`,
              transform: `translate3d(${x}%, ${y}%, 0)`,
            }}/>
          }
        </Motion>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlayedCard);
