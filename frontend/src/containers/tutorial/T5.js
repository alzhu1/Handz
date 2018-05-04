import React from 'react';
import Typography from 'material-ui/Typography';
import PlayedCardArea from 'containers/PlayedCardArea';

const empty_trick = {'north': '', 'south': '', 'east': '', 'west': ''}

class T5 extends React.Component {

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
    var trick1 = {'north': '', 'south': '', 'east': '', 'west': 'QS'}
    var trick2 = {'north': 'KS', 'south': '', 'east': '', 'west': 'QS'}
    var trick3 = {'north': 'KS', 'south': '', 'east': 'AS', 'west': 'QS'}
    var trick4 = {'north': 'KS', 'south': '2S', 'east': 'AS', 'west': 'QS'}

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

  console.log(this.state.trick)
  console.log(this.state.prev_trick)



  const textStyle = {

  }


  const title = 'At the start of the hand, your left hand opponent (East) \
                will choose a card to play. The play will proceed clockwise, \
                with each hand playing a card.'
  const body = 'The result of a complete revolution of cards is called a trick.'


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

export default (T5);
