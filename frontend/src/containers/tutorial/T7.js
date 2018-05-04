import React from 'react';
import Typography from 'material-ui/Typography';
import PlayedCardArea from 'containers/PlayedCardArea';

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class T7 extends React.Component {

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
    var trick1 = {'north': '', 'south': '', 'east': '', 'west': '2S'}
    var trick2 = {'north': '3S', 'south': '', 'east': '', 'west': '2S'}
    var trick3 = {'north': '3S', 'south': '', 'east': 'QS', 'west': '2S'}
    var trick4 = {'north': '3S', 'south': '5D', 'east': 'QS', 'west': '2S'}
    var trick5 = {'north': '', 'south': '', 'east': 'KC', 'west': ''}

    this.setState({prev_trick : empty_trick})
    this.setState({trick : empty_trick})
    this.setState({trick_string : ''})

    setTimeout(function() {this.setState({trick : trick1})}.bind(this), 1000);

    setTimeout(function() {this.setState({trick : trick2})}.bind(this), 2000);

    setTimeout(function() {this.setState({trick : trick3})}.bind(this), 3000);

    // setTimeout(function() {this.setState({trick : trick4})}.bind(this), 4000);
    setTimeout(function() {this.setState({prev_trick : trick4})}.bind(this), 3000);
    setTimeout(function() {this.setState({trick_string : 'E'})}.bind(this), 3000);


    setTimeout(function() {this.setState({trick : empty_trick})}.bind(this), 4000);

    setTimeout(function() {this.setState({trick : trick5})}.bind(this), 7000);
  }

  componentWillMount() {
    this.trickAnimation()
    var intervalId = setInterval(() => this.trickAnimation(), 9000);
    this.timer = intervalId
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  render(){


  const textStyle = {

  }


  const title = 'The hand that played the winning card can choose any card \
                to start the next trick.'
  const body = ''


    return (
      <div>
        <Typography style={textStyle}>
          {title}
        </Typography>
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

export default (T7);
