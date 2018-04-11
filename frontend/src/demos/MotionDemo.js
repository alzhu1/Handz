import React from 'react';
import {Motion, spring} from 'react-motion';

export default class MotionDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  };

  handleMouseDown = () => {
    this.setState({open: !this.state.open});
    console.log('click')
    console.log(this.state.open)
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };

  render() {
    let styles1 = {
      borderRadius: '4px',
      backgroundColor: 'rgb(240, 240, 232)',
      position: 'relative',
      margin: '5px 3px 10px',
      width: '450px',
      height: '50px',
    }


    return (
      <div>
        <button
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}>
          Toggle
        </button>

        <Motion style={{x: spring(this.state.open ? 400 : 0)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
            <div style={styles1}>
              <div style={{
                position: 'absolute',
                width: '50px',
                height: '50px',
                borderRadius: '4px',
                backgroundColor: 'rgb(130, 181, 198)',
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
              }} />
            </div>
          }
        </Motion>
      </div>
    );
  };
}
