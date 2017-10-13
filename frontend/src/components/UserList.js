import React from 'react';

export default class Chat extends React.Component {
    render() {
      // var userlist = [];
      // this.props.userlist.map((name) => {
      //     userlist.push(
      //        <li>{name}</li>
      //      );
      //   });

      return (
        <div>
            {this.props.userlist}
        </div>
      )
    }
}
