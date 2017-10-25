import React from 'react';
var _ = require('lodash');

export default class Chat extends React.Component {


    render() {
      const names = this.props.userlist.map((name) => {
        return <li onClick={()=> this.props.changeReceiver(name)}
                    key={_.uniqueId()}>{name}</li>
      })

      return (
        <div>
            {names}
        </div>
      )
    }
}
