import React from 'react';
import Card from 'components/Card';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';
import {Motion, spring, presets} from 'react-motion';


const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class PlayedCard extends React.Component {


  render(){
    var p = 200
    var w = 75
    var h = 60
    var inital_x = 0;
    var inital_y = 0;
    var end_x = 0;
    var end_y = 0;

    console.log('this.props.collapse')
    console.log(this.props.collapse)

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
      }
      else if (this.props.position === 'left'){
        inital_x = -w
      }
      else if (this.props.position === 'right'){
        inital_x = w
      }
      else if (this.props.position === 'bottom'){
        inital_y = h
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
        <Motion style={{x: spring(this.props.card !== '' ? end_x : inital_x, presets.stiff),
                        y: spring(this.props.card !== '' ? end_y : inital_y, presets.stiff),
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
