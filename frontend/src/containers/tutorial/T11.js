import React from 'react';
import Typography from 'material-ui/Typography';
import PlayedCardArea from 'containers/PlayedCardArea';
import Contract from 'components/Contract';
import TricksArea from 'containers/TricksArea';

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class T11 extends React.Component {

  constructor(){
    super()
    this.timer = null;
    this.state = {
      trick: empty_trick,
      prev_trick: empty_trick,
      collapse: false,
      trick_string: ''
    };
  }

  trickAnimation() {
    var trick1 = {'north': '', 'south': '', 'east': '', 'west': '2H'}
    var trick2 = {'north': 'KH', 'south': '', 'east': '', 'west': '2H'}
    var trick3 = {'north': 'KH', 'south': '', 'east': '2S', 'west': '2H'}
    var trick4 = {'north': 'KH', 'south': '3S', 'east': '2S', 'west': '2H'}

    this.setState({prev_trick : empty_trick})
    this.setState({trick : empty_trick})
    this.setState({trick_string : ''})

    setTimeout(function() {this.setState({trick : trick1})}.bind(this), 1000);

    setTimeout(function() {this.setState({trick : trick2})}.bind(this), 2000);

    setTimeout(function() {this.setState({trick : trick3})}.bind(this), 3000);

    // setTimeout(function() {this.setState({trick : trick4})}.bind(this), 4000);
    setTimeout(function() {this.setState({prev_trick : trick4})}.bind(this), 3000);
    setTimeout(function() {this.setState({trick_string : 'S'})}.bind(this), 4000);
    setTimeout(function() {this.setState({trick : empty_trick})}.bind(this), 4000);

    var trick5 = {'north': '', 'south': '3D', 'east': '', 'west': ''}
    var trick6 = {'north': '', 'south': '3D', 'east': '', 'west': '5D'}
    var trick7 = {'north': 'KD', 'south': '3D', 'east': '', 'west': '5D'}
    var trick8 = {'north': 'KD', 'south': '3D', 'east': 'AD', 'west': '5D'}

    setTimeout(function() {this.setState({trick : trick5})}.bind(this), 8000);

    setTimeout(function() {this.setState({trick : trick6})}.bind(this), 9000);

    setTimeout(function() {this.setState({trick : trick7})}.bind(this), 10000);

    // setTimeout(function() {this.setState({trick : trick4})}.bind(this), 4000);
    setTimeout(function() {this.setState({prev_trick : trick8})}.bind(this), 10000);
    setTimeout(function() {this.setState({trick_string : 'SE'})}.bind(this), 11000);
    setTimeout(function() {this.setState({trick : empty_trick})}.bind(this), 11000);

  }

  componentWillMount() {
    this.trickAnimation()
    var intervalId = setInterval(() => this.trickAnimation(), 15000);
    this.timer = intervalId
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render(){

  const textStyle = {

  }

  const contractStyle = {
    margin: 'auto',
    position: 'absolute',
    left: '0%',
    top: '40%',
  }

  const tricksAreStyle = {
    margin: 'auto',
    position: 'absolute',
    left: '80%',
    top: '70%',
  }


  const title = 'After a trick is completed, the trick is placed in the bottom \
                right, turned vertically if you won the trick, and horizontally \
                if you lost the trick.'
  const body = 'You can use them to keep track of how many tricks you’ve won or lost.'
  const contract = '1SS'

    return (
      <div>
        <Typography style={textStyle}>
          {title}
        </Typography>
        <div style={contractStyle}>
          <Contract contract={contract}/>
        </div>
        <div>
        <PlayedCardArea seat={'south'}
                        trick={this.state.trick}
                        prev_trick={this.state.prev_trick}
                        trick_string={this.state.trick_string}/>
        </div>
        <Typography style={textStyle}>
          {body}
        </Typography>
        <div style={tricksAreStyle}>
          <TricksArea trick_string={this.state.trick_string}/>
        </div>
      </div>

    )
  }
}

export default (T11);
