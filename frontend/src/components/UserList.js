import React from 'react';

export default class Chat extends React.Component {


    render() {
      const names = this.props.userlist.map((name) => {
        return <li onClick={()=> this.props.changeReceiver(name)}>{name}</li>
      })

      return (
        <div>
            {names}
        </div>
      )
    }
}
