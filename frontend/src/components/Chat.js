import React from 'react';


const styles = {
  margin:0,
  marginbottom:25,
  padding:10,
  height:270,
  width:430,
  border:1,
  overflow:'auto'
};

export default class Chat extends React.Component {
    render() {
      return (
        <div>
          <div style={styles}></div>
          <form onSubmit={(e) => {
              e.preventDefault();
              this.props.sendMessage('testy message');}
            }>
              <input name="usermsg" type="text" size="63" />
              <input name="submitmsg" type="submit" value="Send" />
          </form>
        </div>
      )
    }
}
