import React from 'react';
import {Motion, spring, presets} from 'react-motion';


export default class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  };

  handleMouseDown = () => {
    this.setState({open: !this.state.open});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };

  render() {
    return (

      <div>
        <button
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}>
          Toggle
        </button>

        <Motion style={{x: spring(this.state.open ? 600 : 0, presets.wobbly)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
              <img className='card' src={require('cardsJS/cards/2S.svg')}
              style={{
                WebkitTransform: 'translate3d(${x}px, 0, 0)',
                transform: 'translate3d(${x}px, 0, 0)',
              }}/>
          }
        </Motion>

      </div>
    );
  };
}
