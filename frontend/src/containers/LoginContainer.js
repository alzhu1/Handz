import React from 'react';
import LoginPage from 'components/LoginPage'
import SuitSymbol from 'components/SuitSymbol';

export default class LoginContainer extends React.Component {
    constructor() {
        super();
        this.state = {name: "", password: ""};
    }

    changeName = (event) => {
        this.setState({name: event.target.value});
    }

    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
          <div>
            <LoginPage
                name={this.state.name}
                password={this.state.password}
                changeName={this.changeName}
                changePassword={this.changePassword}/>
              <SuitSymbol suit={'S'} additionalStyles={{width: '0px'}}/>
          </div>
        );
    }
}
