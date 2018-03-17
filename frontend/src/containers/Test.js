import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'components/Card';

class Test extends React.Component {

  componentDidMount()  {
    console.log(ReactDOM.findDOMNode(this.refs.blah).style);
    console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.blah)).getPropertyValue("padding"));
    console.log(ReactDOM.findDOMNode(this.refs.blah2).style);
    console.log(window.getComputedStyle(ReactDOM.findDOMNode(this.refs.blah2)).getPropertyValue("padding"));
  }

  render() {

    var rotate_style= {
        transform: 'rotate(90deg)',
        marginBottom: window.innerWidth/-100 + 'px',
    }

    return (
      <div>
      <div className="hand vhand-compact active-hand" >
        <Card card='9S' parentClass= {"hand vhand-compact active-hand"} firstChild={true}/>
        <Card card='QH' parentClass= {"hand vhand-compact active-hand"}ref={"blah"}/>
        <Card card='AH' parentClass= {"hand vhand-compact active-hand"} />
      </div>
      <div  className="hhand-compact" >
        <Card card='9S' parentClass= {"hhand-compact"} firstChild={true}/>
        <Card card='QH' parentClass= {"hhand-compact"} addStyle={rotate_style}/>
        <Card card='AH' parentClass= {"hhand-compact"} addStyle={rotate_style}/>
        <Card card='AS' parentClass= {"hhand-compact"} addStyle={{transform: 'rotate(0deg)'}}/>
      </div>
      <div className="hand active-hand"  data-hand='flow: horizontal; spacing: 0.2; width: 50'>
          <img className='card' src={require('cardsJS/cards/KS.svg')}/>
          <img className='card' src={require('cardsJS/cards/QS.svg')} style={rotate_style}/>
          <img className='card' src={require('cardsJS/cards/KH.svg')} style={{transform: 'rotate(0deg)'}}/>
          <img className='card' src={require('cardsJS/cards/KD.svg')}/>
          <img className='card' src={require('cardsJS/cards/KC.svg')}/>
          <img className='card' src={require('cardsJS/cards/2S.svg')}/>
    </div>
    <div className='hand active-hand' data-hand='flow: horizontal; spacing: 0.2; width: 50'>
        <Card card='9S' />
        <Card card='QH' />
        <Card card='AH' />
    </div>
    <div className='hand active-hand' data-hand='flow: vertical; spacing: 0.2; width: 70'>
        <Card card='9S' />
        <Card card='QH' ref={"blah2"}/>
        <Card card='AH' />
    </div>
    <div className='fan' data-fan='spacing: 0.1; width: 80; radius: 80'>
      <Card card='AS' />
      <Card card='9S' />
      <Card card='QH' />
      <Card card='AH' />
    </div>
    </div>
    )
  }
}

export default Test;
