import React from 'react';
import Typography from 'material-ui/Typography';
import PlayedCardArea from 'containers/PlayedCardArea';
import Contract from 'components/Contract';

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class T10 extends React.Component {

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
    setTimeout(function() {this.setState({trick_string : 'S'})}.bind(this), 3000);


    setTimeout(function() {this.setState({trick : empty_trick})}.bind(this), 4000);
  }

  componentWillMount() {
    this.trickAnimation()
    var intervalId = setInterval(() => this.trickAnimation(), 7000);
    this.timer = intervalId
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render(){

  const textStyle = {

  }


  const title = 'And you can beat trump cards with higher trump cards!'
  const body = '(Remember you still have to follow suit, you cannot trump a \
                  trick until you run out of the suit of the the \
                  first card in the trick)'
  const contract = '1SS'

    return (
      <div>
        <Typography style={textStyle}>
          {title}
        </Typography>
        <div>
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
      </div>
    )
  }
}

export default (T10);
