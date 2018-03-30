import React from 'react';
import Floater from 'react-floater';
import Card from 'components/Card';
import PlayedCard from 'containers/PlayedCard';
import {mapStateToProps, mapDispatchToProps} from 'redux/map';
import {connect} from 'react-redux';

class PreviousTrick extends React.Component {

  render() {
    let styles_top = {
      gridColumn: '2 / 3',
      gridRow: '1 / 2'
    }
    let styles_left = {
      gridColumn: '1 / 2',
      gridRow: '2 / 3'
    }
    let styles_right = {
      gridColumn: '3 / 4',
      gridRow:  '2 / 3'
    }
    let styles_bottom = {
      gridColumn: '2 / 3',
      gridRow: '3 / 4'
    }

    let wrapper_styles = {
      wrapper :
        {
          cursor: 'default',
          display: 'inline-block',
        }
    }
    
    return (
      <div className='card' style={{display:'inline-block'}}>
        <Floater styles={wrapper_styles}
          content={
            <div className='PlayedCardArea2'>
            <Card card={this.props.prev_trick['north']} addStyle={styles_top}/>
            <Card card={this.props.prev_trick['west']} addStyle={styles_left}/>
            <Card card={this.props.prev_trick['east']} addStyle={styles_right}/>
            <Card card={this.props.prev_trick['south']} addStyle={styles_bottom}/>
            </div>
          }
          event="hover"
          placement="top"
        >
          <Card card={'Blue_Back'}
          establishedCard={true}
          lastTrick={true}
          parentClass={this.props.parentClass}
          addStyle={this.props.addStyle}/>
        </Floater>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PreviousTrick);
